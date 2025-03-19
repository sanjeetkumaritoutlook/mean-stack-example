import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'
  ]
})
export class RegisterComponent {
  user = { name: '', email: '', phone: '', username: '', password: '' };
  message = '';

  constructor(private authService: AuthService,private http: HttpClient) {}
  registerUser() {
    this.http.post('http://localhost:5200/api/auth/register', this.user)
      .subscribe({
        next: (res: any) => this.message = res.msg,
        error: (err) => this.message = err.error.msg || "Registration failed"
      });
  }
  logout() {
    this.authService.logout();
  }
}
