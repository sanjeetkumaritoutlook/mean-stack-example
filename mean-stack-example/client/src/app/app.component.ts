import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container-md">
    <router-outlet></router-outlet>
    <app-toast></app-toast>
  </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'client';
}
