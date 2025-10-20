import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as e from 'express';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}`; // ✅ Use environment variable
  private jwtHelper = new JwtHelperService();
  
  // Loading state management
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // login(username: string, password: string) {
  //   return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password }).subscribe(res => {
  //     localStorage.setItem('token', res.token);
  //     this.router.navigate(['/register']);
  //   });
  // }

  login(username: string, password: string): Observable<{token: string, message?: string}> {
    this.loadingSubject.next(true); // Start loading
    
    return this.http.post<{ token: string, message?: string }>(
      `${this.apiUrl}/api/auth/login`,  // ✅ Correct URL
      { username, password },                   // ✅ Send JSON request body
      { headers: { 'Content-Type': 'application/json' } } // ✅ Ensure headers are set
    ).pipe(
      tap(res => {
        // Success handling
        localStorage.setItem('token', res.token);
        this.loadingSubject.next(false); // Stop loading
        this.router.navigate(['/register']);
      }),
      catchError(error => {
        // Error handling
        this.loadingSubject.next(false); // Stop loading
        console.error('Login failed', error);
        return throwError(() => error);
      })
    );
  }
  

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  //used in auth guard
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

   // ✅ Get JWT from localStorage
   getToken(): string | null {
    return localStorage.getItem("token");
  }
   // ✅ Decode JWT to get user data
   getDecodedToken(): any {
    const token = this.getToken();
    return token ? this.jwtHelper.decodeToken(token) : null;
  }
    // ✅ Check if JWT is expired
    isTokenExpired(): boolean {
      const token = this.getToken();
      return token ? this.jwtHelper.isTokenExpired(token) : true;
    }
}
