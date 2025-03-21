import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component'; // <-- add this line
import { EditEmployeeComponent } from './edit-employee/edit-employee.component'; // <-- add this line
import { LoginComponent } from './login/login.component'; 
import { RegisterComponent } from './register/register.component';
import {authGuard} from './auth.guard';
// const routes: Routes = [];
const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesListComponent },
  { path: 'employees/new', component: AddEmployeeComponent }, // <-- add this line
 { path: 'employees/edit/:id', component: EditEmployeeComponent }, // <-- add this line
 { path: 'login', component: LoginComponent },
 { path: 'register', component: RegisterComponent, canActivate: [authGuard] },
 { path: '**', redirectTo: 'login' }
 
 ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
