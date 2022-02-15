import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../../../security/data/models/user.model";
import {ProfileService} from "../../../../../services/profile.service";
import {UserInterest} from "../../../../../data/model/user-interest.model";
import {Store} from "@ngrx/store";
import {State} from "../../../../../../app.state";
import {GlobalNotification} from "../../../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../../../core/data/models/notification.model";
import {UserUpdated} from "../../../../../../security/data/actions";

declare var $: any;

@Component({
  selector: 'app-edit-interests',
  templateUrl: './edit-interests.component.html',
  styleUrls: ['./edit-interests.component.css']
})
export class EditInterestsComponent implements OnInit {

  @Input() user: User;

  editableInterests: UserInterest[];

  customEditing: boolean = false;

  constructor(
    private profileService: ProfileService,
    private store: Store<State>
  ) { }

  ngOnInit(): void {


  }

  onCancelEditHandler(event)
  {

  }

  onEditInitHandler(event)
  {
    this.editableInterests = [...this.user.interests]

    const tagsInput = $('#interests');
    tagsInput.tagsinput({
      freeInput: true,
      allowDuplicates: false,
      maxChars: 30,
      trimValue: true
    });

    this
      .user
      .interests
      .forEach((item) => {
        tagsInput.tagsinput('add', item.name)
      });

    tagsInput.on('itemAdded', async (event) => {
      //this.interestHash[event.item] = event.id;
      // calling the server for adding the tag
      try {
        const newInterest: UserInterest = await this.profileService.addInterest(event.item).toPromise();
        this.editableInterests.push(newInterest);
      }
      catch (error)
      {
        this.store.dispatch(
          new GlobalNotification(
            new Notification(NotificationType.ERROR, 'Cannot add this one!', 'Error')
          ));
      }
    });

    tagsInput.on('itemRemoved', async (event) => {

      //debugger
      this.customEditing = true;
      //const interestId = this.interestHash[event.item];
      // call the server for removing the tag from user's interests
      try {
        const removedInterest: UserInterest = await this.profileService.removeInterest(event.item).toPromise();

        const removedIndex = this.editableInterests.findIndex(interest => interest.id === removedInterest.id);
        if (removedIndex !== -1)
        {
          this.editableInterests.splice(removedIndex, 1);
        }
      }
      catch (error)
      {
        this.store.dispatch(
          new GlobalNotification(
            new Notification(NotificationType.ERROR, 'Cannot remove this one!', 'Error')
          ));
      }

      this.customEditing = false;
    });
  }

  onEditCommitHandler(event)
  {
    const newUser: User = User.createFromRawData({
      ...this.user,
      interests: [...this.editableInterests]
    });

    this.user = newUser;

    this.store.dispatch(new UserUpdated(newUser));
  }
}
