import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styles: [`
    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      animation: spin 2s linear infinite;
      display: inline-block;
      margin-right: 10px;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .login-container {
      max-width: 400px;
      margin: 100px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }

    .form-group {
      margin-bottom: 15px;
    }

    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }

    button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    button:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }

    button:hover:not(:disabled) {
      background-color: #0056b3;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private toastService: ToastService
  ) {
    // Subscribe to loading state
    this.authService.loading$.subscribe(loading => {
      this.isLoading = loading;
    });
  }

  login() {
    if (!this.username || !this.password) {
      this.toastService.showError('Please enter both username and password');
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.toastService.showSuccess('Login successful! Redirecting...');
      },
      error: (error) => {
        let errorMessage = 'Login failed. Please try again.';
        
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.status === 401) {
          errorMessage = 'Invalid username or password';
        } else if (error.status === 0) {
          errorMessage = 'Unable to connect to server';
        }
        
        this.toastService.showError(errorMessage);
      }
    });
  }


}
