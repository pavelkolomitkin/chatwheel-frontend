import {Directive, ElementRef, HostBinding, Input, OnInit, Renderer2} from '@angular/core';
import {User} from "../../security/data/models/user.model";
import {environment} from "../../../environments/environment";

@Directive({
  selector: '[appUserActivityStatus]'
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

    const timeDifference = +this.user.lastActivity - (+new Date());

    if (timeDifference < environment.onlineActivitySeconds)
    {
      result = UserActivityStatusDirective.ONLINE_STATUS_CLASS;
    }
    else if (timeDifference < environment.recentOnlineActivitySeconds)
    {
      result = UserActivityStatusDirective.RECENTLY_STATUS_CLASS
    }
    else
    {
      result = UserActivityStatusDirective.OFFLINE_STATUS_CLASS;
    }

    return result;
  }

}
