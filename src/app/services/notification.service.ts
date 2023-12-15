import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Notification, NotificationType } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() { }

  private notificationSubj: Subject<Notification> = new BehaviorSubject(null);

  success(message: string, duration: number = null) {
    this.notify(message, NotificationType.Success, duration);
  }

  warning(message: string, duration: number = null) {
    this.notify(message, NotificationType.Warning, duration);
  }

  error(message: string, duration: number = null) {
    this.notify(message, NotificationType.Error, duration);
  }

  private notify(message: string, type: NotificationType, duration: number) {
    this.notificationSubj.next({
      message,
      type,
      duration: duration ?? 3000
    });
  }

  get notification() {
    return this.notificationSubj.asObservable();
  }
}