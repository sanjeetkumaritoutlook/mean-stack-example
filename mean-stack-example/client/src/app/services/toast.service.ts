import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<Toast | null>(null);
  public toast$ = this.toastSubject.asObservable();

  constructor() {}

  showSuccess(message: string, duration: number = 4000) {
    this.showToast(message, 'success', duration);
  }

  showError(message: string, duration: number = 4000) {
    this.showToast(message, 'error', duration);
  }

  showInfo(message: string, duration: number = 4000) {
    this.showToast(message, 'info', duration);
  }

  showWarning(message: string, duration: number = 4000) {
    this.showToast(message, 'warning', duration);
  }

  private showToast(message: string, type: 'success' | 'error' | 'info' | 'warning', duration: number) {
    this.toastSubject.next({ message, type, duration });

    // Auto hide toast after specified duration
    setTimeout(() => {
      this.hide();
    }, duration);
  }

  hide() {
    this.toastSubject.next(null);
  }
}