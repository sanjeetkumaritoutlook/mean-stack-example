import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastService, Toast } from '../services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  template: `
    <div 
      *ngIf="currentToast" 
      class="toast" 
      [class]="'toast-' + currentToast!.type"
    >
      {{ currentToast!.message }}
      <span class="close-btn" (click)="closeToast()">×</span>
    </div>
  `,
  styles: [`
    .toast {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 6px;
      color: white;
      font-weight: 500;
      z-index: 1000;
      min-width: 300px;
      max-width: 500px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideIn 0.3s ease-in-out;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .toast-success {
      background: linear-gradient(135deg, #4CAF50, #45a049);
    }

    .toast-error {
      background: linear-gradient(135deg, #f44336, #d32f2f);
    }

    .toast-info {
      background: linear-gradient(135deg, #2196F3, #1976D2);
    }

    .toast-warning {
      background: linear-gradient(135deg, #ff9800, #f57c00);
    }

    .close-btn {
      cursor: pointer;
      font-size: 20px;
      font-weight: bold;
      margin-left: 15px;
      opacity: 0.8;
      transition: opacity 0.2s;
    }

    .close-btn:hover {
      opacity: 1;
    }
  `]
})
export class ToastComponent implements OnInit, OnDestroy {
  currentToast: Toast | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.subscription = this.toastService.toast$.subscribe(toast => {
      this.currentToast = toast;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  closeToast() {
    this.toastService.hide();
  }
}