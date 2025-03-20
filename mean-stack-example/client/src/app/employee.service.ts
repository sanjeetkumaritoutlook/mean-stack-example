import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = 'http://localhost:5200';
  private employees$ = new BehaviorSubject<Employee[]>([]); // ✅ Use BehaviorSubject to hold initial state
  
  constructor(private httpClient: HttpClient) { }

  // ✅ Fetch employees and update BehaviorSubject
  private refreshEmployees() {
    this.httpClient.get<Employee[]>(`${this.url}/employees`).subscribe(employees => {
      if (Array.isArray(employees)) {
        this.employees$.next(employees);
      } else {
        console.error("Expected an array but got:", employees);
        this.employees$.next([]); // Handle unexpected API response
      }
    });
  }

  // ✅ Return employees$ as an Observable
  getEmployees(): Observable<Employee[]> {
    this.refreshEmployees();
    return this.employees$.asObservable();
  }

  getEmployee(id: string): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.url}/employees/${id}`);
  }

  createEmployee(employee: Employee): Observable<string> {
    return this.httpClient.post(`${this.url}/employees`, employee, { responseType: 'text' });
  }

  updateEmployee(id: string, employee: Employee): Observable<string> {
    return this.httpClient.put(`${this.url}/employees/${id}`, employee, { responseType: 'text' });
  }

  deleteEmployee(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/employees/${id}`, { responseType: 'text' });
  }
}
