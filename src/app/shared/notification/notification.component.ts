import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs';
import { Notification, NotificationType } from 'src/app/models/notification.model';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @ViewChild('notificationContainer') container: ElementRef<HTMLDivElement>;

  private subscribed: boolean = true;

  constructor(private service: NotificationService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.service.notification
      .pipe(takeWhile(() => this.subscribed))
      .subscribe(notification => {
        if (notification) this.render(notification);
      });
  }

  ngOnDestroy() {
    this.subscribed = false;
  }

  private render(notification: Notification) {
    const notificationEl = this.renderer.createElement('div');
    const header = this.renderer.createElement('div');
    this.renderer.addClass(header, 'notification__header')

    this.renderer.addClass(notificationEl, 'notification')
    this.renderer.addClass(notificationEl, `notification--${NotificationType[notification.type].toLowerCase()}`)
    this.renderer.setStyle(notificationEl, 'transition', `opacity ${notification.duration / 10}ms`);

    const headerText = this.renderer.createText(NotificationType[notification.type]);
    this.renderer.appendChild(header, headerText);

    const text = this.renderer.createText(notification.message);
    const content = this.renderer.createElement('div');
    this.renderer.appendChild(content, text);
    this.renderer.appendChild(this.container.nativeElement, notificationEl);
    this.renderer.appendChild(notificationEl, header);
    this.renderer.appendChild(notificationEl, content);

    setTimeout(() => {
      this.renderer.setStyle(notificationEl, 'opacity', '0');
      setTimeout(() => {
        this.renderer.removeChild(this.container.nativeElement, notificationEl);
      }, notification.duration);
    }, notification.duration);
  }
}