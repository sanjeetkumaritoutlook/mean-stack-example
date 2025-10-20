import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-add-employee',
  template: `
  <h2 class="text-center m-5">Add a New Employee</h2>
  <app-employee-form 
    (formSubmitted)="addEmployee($event)"
    [isLoading]="isLoading"
    buttonText="Add Employee">
  </app-employee-form>
`,
  styles: [
  ]
})
export class AddEmployeeComponent {
  isLoading = false;

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private toastService: ToastService
  ) { }
  
  addEmployee(employee: Employee) {
    this.isLoading = true;
    
    this.employeeService.createEmployee(employee)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.toastService.showSuccess('Employee added successfully!');
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          this.isLoading = false;
          let errorMessage = 'Failed to create employee. Please try again.';
          
          if (error.error?.message) {
            errorMessage = error.error.message;
          } else if (error.status === 400) {
            errorMessage = 'Invalid employee data provided';
          } else if (error.status === 0) {
            errorMessage = 'Unable to connect to server';
          }
          
          this.toastService.showError(errorMessage);
          console.error('Error creating employee:', error);
        }
      });
  }
  
}
