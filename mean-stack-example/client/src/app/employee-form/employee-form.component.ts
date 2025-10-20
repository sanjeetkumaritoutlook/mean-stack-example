import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../employee';
@Component({
  selector: 'app-employee-form',
  template: `
  <form class="employee-form" autocomplete="off" [formGroup]="employeeForm" (ngSubmit)="submitForm()">
    <div class="form-floating mb-3">
      <input class="form-control" type="text" id="name" formControlName="name" placeholder="Name" [disabled]="isLoading" required>
      <label for="name">Name</label>
    </div>

    <div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">
      <div *ngIf="name.errors?.['required']">
        Name is required.
      </div>
      <div *ngIf="name.errors?.['minlength']">
        Name must be at least 3 characters long.
      </div>
    </div>

    <div class="form-floating mb-3">
      <input class="form-control" type="text" formControlName="position" placeholder="Position" [disabled]="isLoading" required>
      <label for="position">Position</label>
    </div>

    <div *ngIf="position.invalid && (position.dirty || position.touched)" class="alert alert-danger">

      <div *ngIf="position.errors?.['required']">
        Position is required.
      </div>
      <div *ngIf="position.errors?.['minlength']">
        Position must be at least 5 characters long.
      </div>
    </div>

    <div class="mb-3">
      <div class="form-check">
        <input class="form-check-input" type="radio" formControlName="level" name="level" id="level-junior" value="junior" [disabled]="isLoading" required>
        <label class="form-check-label" for="level-junior">Junior</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" formControlName="level" name="level" id="level-mid" value="mid" [disabled]="isLoading">
        <label class="form-check-label" for="level-mid">Mid</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" formControlName="level" name="level" id="level-senior"
          value="senior" [disabled]="isLoading">
        <label class="form-check-label" for="level-senior">Senior</label>
      </div>
    </div>

    <button 
      class="btn btn-primary" 
      type="submit" 
      [disabled]="employeeForm.invalid || isLoading"
    >
      <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      {{ isLoading ? (buttonText === 'Add' ? 'Adding...' : 'Updating...') : buttonText }}
    </button>
  </form>
`,
  styles: [
    `.employee-form {
      max-width: 560px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .spinner-border-sm {
      width: 1rem;
      height: 1rem;
    }`
  ]
})
export class EmployeeFormComponent  implements OnInit{
  //The type of the @Input() is BehaviorSubject<Employee> 
  //because we might pass async data into the form.
  @Input()
  initialState: BehaviorSubject<Employee> = new BehaviorSubject({});
  
  @Input()
  isLoading: boolean = false;
  
  @Input()
  buttonText: string = 'Add';
  
  @Output()
  formValuesChanged = new EventEmitter<Employee>();
  
  @Output()
  formSubmitted = new EventEmitter<Employee>();
  
  employeeForm: FormGroup = new FormGroup({});
  
  constructor(private fb: FormBuilder) { }
  
  get name() { return this.employeeForm.get('name')!; }
  get position() { return this.employeeForm.get('position')!; }
  get level() { return this.employeeForm.get('level')!; }
  
  ngOnInit() {
    this.initialState.subscribe(employee => {
      // using the FormBuilder to create a reactive form with three fields
      // and we're also adding validation to the form. 
      this.employeeForm = this.fb.group({
        name: [ employee.name, [Validators.required] ],
        position: [ employee.position, [ Validators.required, Validators.minLength(5) ] ],
        level: [ employee.level, [Validators.required] ]
      });
    });
  
    this.employeeForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }
  
  submitForm() {
    this.formSubmitted.emit(this.employeeForm.value);
  }
 

}
