import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../../../security/data/models/user.model";
import {Store} from "@ngrx/store";
import {State} from "../../../../../../app.state";
import {ProfileService} from "../../../../../services/profile.service";
import {UserUpdated} from "../../../../../../security/data/actions";
import {GlobalNotification} from "../../../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../../../core/data/models/notification.model";

@Component({
  selector: 'app-edit-full-name',
  templateUrl: './edit-full-name.component.html',
  styleUrls: ['./edit-full-name.component.css']
})
export class EditFullNameComponent implements OnInit {

  name: string;

  isSaving: boolean = false;

  @Input() user: User;

  constructor(
    private store: Store<State>,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.name = this.user.fullName;
  }

  async onEditCommitHandler(event)
  {
    //debugger;
    const editedName = this.name.trim();
    if (editedName === this.user.fullName)
    {
      return;
    }

    this.isSaving = true;

    try {
      const user: User = await this.profileService.updateFullName(editedName).toPromise();
      this.name = user.fullName;

      this.store.dispatch(new UserUpdated(user));

      this.store.dispatch(new GlobalNotification(new Notification(
        NotificationType.SUCCESS, 'Your name has been edited!', 'Name edited'
      )));
    }
    catch (error)
    {
      this.name = this.user.fullName;
      // notify the error
      this.store.dispatch(new GlobalNotification(new Notification(
        NotificationType.ERROR, 'Cannot edit your name!', 'Error'
      )));
    }

    this.isSaving = false;
  }

  onEditInitHandler(event)
  {
    //debugger;
    this.name = this.user.fullName;
  }

  onCancelEditHandler(event)
  {
    //debugger;
    this.name = this.user.fullName;
  }

}
