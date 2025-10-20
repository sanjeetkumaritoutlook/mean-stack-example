import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-edit-employee',
  template: `
  <h2 class="text-center m-5">Edit an Employee</h2>
  <app-employee-form 
    [initialState]="employee" 
    (formSubmitted)="editEmployee($event)"
    [isLoading]="isLoading"
    buttonText="Update Employee">
  </app-employee-form>
`,
  styles: [
  ]
})
export class EditEmployeeComponent implements OnInit {
  employee: BehaviorSubject<Employee> = new BehaviorSubject({});
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private toastService: ToastService
  ) { }
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }
  
    this.employeeService.getEmployee(id !).subscribe((employee) => {
      this.employee.next(employee);
    });
  }
  
  editEmployee(employee: Employee) {
    this.isLoading = true;
    
    this.employeeService.updateEmployee(this.employee.value._id || '', employee)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.toastService.showSuccess('Employee updated successfully!');
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          this.isLoading = false;
          let errorMessage = 'Failed to update employee. Please try again.';
          
          if (error.error?.message) {
            errorMessage = error.error.message;
          } else if (error.status === 400) {
            errorMessage = 'Invalid employee data provided';
          } else if (error.status === 404) {
            errorMessage = 'Employee not found';
          } else if (error.status === 0) {
            errorMessage = 'Unable to connect to server';
          }
          
          this.toastService.showError(errorMessage);
          console.error('Error updating employee:', error);
        }
      })
  }
  
}
