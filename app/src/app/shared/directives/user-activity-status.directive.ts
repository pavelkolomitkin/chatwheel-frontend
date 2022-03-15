import {Directive, ElementRef, HostBinding, Input, OnInit, Renderer2} from '@angular/core';
import {User} from "../../security/data/models/user.model";
import {environment} from "../../../environments/environment";

@Directive({
  selector: '[app-user-activity-status]'
})
export class UserActivityStatusDirective implements OnInit{

  static ONLINE_STATUS_CLASS = 'user-status bg-active';
  static RECENTLY_STATUS_CLASS = 'user-status bg-was-recently';
  static OFFLINE_STATUS_CLASS = 'user-status bg-offline';

  @HostBinding('class') background: string = '';

  @Input() user: User;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit(): void {

    this.background = this.getStatusClass();
  }

  getStatusClass()
  {
    let result: string = '';

    const activity: string = this.user.getActivityStatus();
    switch (activity)
    {
      case User.ACTIVITY_ONLINE:

        result = UserActivityStatusDirective.ONLINE_STATUS_CLASS;
        break;

      case User.ACTIVITY_WAS_RECENTLY:

        result = UserActivityStatusDirective.RECENTLY_STATUS_CLASS;
        break;

      default:

        result = UserActivityStatusDirective.OFFLINE_STATUS_CLASS;
        break;
    }

    return result;
  }

}
