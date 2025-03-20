import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5200/api/auth';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  // login(username: string, password: string) {
  //   return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password }).subscribe(res => {
  //     localStorage.setItem('token', res.token);
  //     this.router.navigate(['/register']);
  //   });
  // }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(
      'http://localhost:5200/api/auth/login',  // ✅ Correct URL
      { username, password },                   // ✅ Send JSON request body
      { headers: { 'Content-Type': 'application/json' } } // ✅ Ensure headers are set
    ).subscribe(res => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/register']);
    }, error => {
      console.error('Login failed', error);
    });
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
