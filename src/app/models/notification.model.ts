export enum NotificationType {
  Success = 0,
  Warning = 1,
  Error = 2
}

export interface Notification {
  message: string,
  type: NotificationType,
  duration: number
}