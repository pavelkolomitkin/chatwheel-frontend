export enum NotificationType
{
  SUCCESS,
  INFO,
  WARNING,
  ERROR
}

export class Notification
{
  constructor(
    public type: NotificationType,
    public message: string,
    public title: string = '',
    public payload: any = null
  ) { }
}
