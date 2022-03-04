import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../security/data/models/user.model";
import {environment} from "../../../../../environments/environment";
import {Lightbox} from "ngx-lightbox";

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAvatarComponent implements OnInit {

  _avatarUrl: string = null;

  _user: User;

  _styles: Object = {
  }

  getStyles()
  {
    const result = {
      ...this._styles,
      cursor: (this.isLightBox && !!this._user.avatar) ? 'pointer': 'default',
      ...this.additionalStyles
    };

    return result;
  }

  @Input() additionalStyles: Object = {};

  @Input() rotateDegrees: Number = 0;

  @Input() isLightBox: boolean = false;

  @Input() size: string;

  @Input() isActivityVisible: boolean = false;

  @Input()
  set user(user: User)
  {
    this._user = user;
    let avatar = '';


    if (this._user.avatarThumbs && (this._user.avatarThumbs[this.size]))
    {
      avatar = environment.baseApiUrl + this._user.avatarThumbs[this.size];
    }
    else {
      avatar = 'assets/picture/default_avatar.png';
    }

    this._avatarUrl = avatar;

    this.changeDetector.markForCheck();
  }

  constructor(
    private changeDetector: ChangeDetectorRef,
    private lightBox: Lightbox
    ) { }

  ngOnInit() {
  }

  onImageClickHandler(event)
  {
    if (!this.isLightBox || !this._user.avatar)
    {
      return;
    }

    this.lightBox.open([{
      src: environment.baseApiUrl + this._user.avatarThumbs['original'],
      caption: '',
      thumb: environment.baseApiUrl + this._user.avatarThumbs['small']
    }]);
  }

  getActivityClass()
  {
    let result: string = '';

    const status: string = this._user.getActivityStatus();
    switch (status)
    {
      case User.ACTIVITY_ONLINE:
        result = 'user--online';
        break;

      case User.ACTIVITY_WAS_RECENTLY:
        result = 'user--busy';
        break;

      default:
        result = 'user--offline';
        break
    }

    return result;
  }
}
