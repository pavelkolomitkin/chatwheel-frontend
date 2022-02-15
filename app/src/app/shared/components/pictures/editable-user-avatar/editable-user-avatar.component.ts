import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../../security/data/models/user.model";
import {environment} from "../../../../../environments/environment";
import {Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {GlobalNotification, RemoveUserAvatarStart, UploadUserAvatarStart} from "../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../core/data/models/notification.model";
import {UploadFile} from "../../../../core/data/models/upload-file.model";
import {UserGrabPictureFromCameraWindow} from "../../../../client/data/actions";

@Component({
  selector: 'app-editable-user-avatar',
  templateUrl: './editable-user-avatar.component.html',
  styleUrls: ['./editable-user-avatar.component.css']
})
export class EditableUserAvatarComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;

  maxUploadFileSize: number = environment.maxUploadFileSize;
  maxUploadFileSizeLabel: string = environment.maxUploadFileSizeLabel;

  @Input() size: string;

  @Input() user: User;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
  }


  onEditClickHandler(event)
  {

  }

  onFilesSelectHandler(event)
  {
    const files: File[] = event.target.files;
    if (files.length === 0)
    {
      return;
    }

    const file: File = files[0];
    this.fileInput.nativeElement.value = '';

    try {
      this.validateFile(file);
    }
    catch (error)
    {
      this.store.dispatch(new GlobalNotification(new Notification(
        NotificationType.ERROR, error, 'Error'
      )));

      return;
    }

    this.store.dispatch(new UploadUserAvatarStart(new UploadFile(
      file,
    )));
  }

  onRemoveClickHandler(event)
  {
    if (this.user.avatar === null)
    {
      return;
    }

    this.store.dispatch(new RemoveUserAvatarStart());
  }

  validateFile(file: File)
  {
    if (file.size > this.maxUploadFileSize)
    {
      throw 'The file is to big! Maximum is ' + this.maxUploadFileSizeLabel;
    }
  }

  onFromCameraClickHandler(event)
  {
    this.store.dispatch(new UserGrabPictureFromCameraWindow(true));
  }
}
