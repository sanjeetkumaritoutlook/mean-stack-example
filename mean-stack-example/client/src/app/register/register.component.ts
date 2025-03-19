import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styles: [
  ]
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
