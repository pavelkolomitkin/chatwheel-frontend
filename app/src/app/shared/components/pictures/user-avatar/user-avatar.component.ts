import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {User} from "../../../../security/data/models/user.model";
import {Lightbox} from "ngx-lightbox";

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAvatarComponent implements OnInit {

  @ViewChild('imageElement') image: ElementRef;

  _avatarUrl: string = null;

  title: string;

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

    if (this._user)
    {
      this._avatarUrl = this._user.getAvatarPicture(this.size);
      this.title = this.getPictureTitle();
    }

    this.changeDetector.markForCheck();
  }

  getPictureTitle()
  {
    let result: string = this._user.fullName;

    if (this._user.deleted)
    {
      result += ' [Deleted]';
    }
    else if (this._user.isBlocked)
    {
      result += ' [Blocked]';
    }

    return result;
  }

  constructor(
    private changeDetector: ChangeDetectorRef,
    private lightBox: Lightbox
    ) { }

  ngOnInit() {
  }

  onImageClickHandler(event)
  {
    if (!this.isLightBox || this._user.deleted)
    {
      return;
    }

    const originalAvatar = this._user.getAvatarPicture('original');
    const smallAvatar = this._user.getAvatarPicture('small');

    if (!originalAvatar)
    {
      return;
    }

    this.lightBox.open([{
      src: originalAvatar,
      caption: '',
      thumb: smallAvatar
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

  onLoadImageErrorHandler(event)
  {
    this.image.nativeElement.src = this._user.getDefaultAvatar();

    event.stopPropagation();
    event.preventDefault();
  }
}
