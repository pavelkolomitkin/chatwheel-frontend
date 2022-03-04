import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../../../security/data/models/user.model';
import {Store} from '@ngrx/store';
import {State} from '../../../../../../app.state';
import {ProfileService} from '../../../../../services/profile.service';
import {UserUpdated} from '../../../../../../security/data/actions';
import {GlobalNotification} from '../../../../../../core/data/actions';
import {Notification, NotificationType} from '../../../../../../core/data/models/notification.model';

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.css']
})
export class EditAboutComponent implements OnInit {

  about: string;

  isSaving: boolean = false;

  @Input() user: User;

  constructor(
    private store: Store<State>,
    private profileService: ProfileService
  ) { }

  getEntityField()
  {
    return typeof this.user.about !== 'undefined' ? this.user.about : '';
  }

  initField()
  {
    this.about = this.getEntityField();
  }

  hasFieldChanged(): boolean
  {
    return this.about !== this.getEntityField();
  }

  ngOnInit(): void {
    //this.user.about = typeof this.user.about === 'undefined' ? '' : this.user.about;
    this.initField();
  }

  async onEditCommitHandler(event)
  {
    if (!this.hasFieldChanged())
    {
      return
    }

    const editedAbout = this.about.trim();

    this.isSaving = true;

    try {
      const user: User = await this.profileService.updateAbout(editedAbout).toPromise();

      this.about = user.about;
      this.store.dispatch(new UserUpdated(user));
    }
    catch (error)
    {
      this.initField();

      this.store.dispatch(new GlobalNotification(new Notification(
        NotificationType.ERROR, 'Cannot edit about!', 'Error'
      )));
    }

    this.isSaving = false;
  }

  onEditInitHandler(event)
  {
    this.initField();
  }

  onCancelEditHandler(event)
  {
    this.initField();
  }

}
