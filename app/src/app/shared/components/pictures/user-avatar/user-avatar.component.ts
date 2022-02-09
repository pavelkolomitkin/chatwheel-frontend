import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../security/data/models/user.model";

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAvatarComponent implements OnInit {

  _avatarUrl: string = null;

  _user: User;

  @Input() size: string;

  @Input()
  set user(user: User)
  {
    this._user = user;
    let avatar = '';

    if (this._user.avatarThumbs && (this._user.avatarThumbs[this.size]))
    {
      avatar = this._user.avatarThumbs[this.size];
    }
    else {
      avatar = 'assets/picture/default_avatar.png';
    }

    this._avatarUrl = avatar;

    this.changeDetector.markForCheck();
  }

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
  }
}
