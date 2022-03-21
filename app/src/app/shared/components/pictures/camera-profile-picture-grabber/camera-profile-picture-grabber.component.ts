import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {UserMediaService} from "../../../../core/services/user-media.service";
import {Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {GlobalNotification, UploadUserAvatarStart} from "../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../core/data/models/notification.model";
import {UploadFile} from "../../../../core/data/models/upload-file.model";
import {UploadDataService} from "../../../../core/services/upload/upload-data.service";
import {File} from "@angular/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system";

@Component({
  selector: 'app-camera-profile-picture-grabber',
  templateUrl: './camera-profile-picture-grabber.component.html',
  styleUrls: ['./camera-profile-picture-grabber.component.css']
})
export class CameraProfilePictureGrabberComponent implements OnInit, OnDestroy {

  @Output('onComplete') completeEmitter: EventEmitter<void> = new EventEmitter<void>();

  static MEDIA_INIT_SUCCESS = 'success';
  static MEDIA_INIT_IN_PROGRESS = 'inProgress';
  static MEDIA_INIT_ERROR = 'error';

  isPictureTaken: boolean = false;


  @ViewChild('takenPicturePreview') canvasElement: ElementRef;
  @ViewChild('video') videoElement: ElementRef;

  userMediaStream: MediaStream;

  mediaInitState: string;

  constructor(
    private mediaService: UserMediaService,
    private uploadDataService: UploadDataService,
    private store: Store<State>
  ) { }

  async ngOnInit() {

    await this.initMedia();

  }

  ngOnDestroy(): void {

    this.releaseMedia();
  }

  async initMedia()
  {
    this.mediaInitState = CameraProfilePictureGrabberComponent.MEDIA_INIT_IN_PROGRESS;

    try {
      // @ts-ignore
      this.userMediaStream = await this.mediaService.getUserMedia(false, true);
      this.mediaInitState = CameraProfilePictureGrabberComponent.MEDIA_INIT_SUCCESS;

      this.videoElement.nativeElement.srcObject = this.userMediaStream;
      this.videoElement.nativeElement.play();
    }
    catch (error)
    {

      this.mediaInitState = CameraProfilePictureGrabberComponent.MEDIA_INIT_ERROR;

      this.store.dispatch(
        new GlobalNotification(new Notification(
          NotificationType.INFO, 'Please, turn on your webcam to take the picture! :-)',
        )));
    }
  }

  releaseMedia()
  {
    if (!!this.userMediaStream)
    {
      this.userMediaStream.getTracks().forEach(track => track.stop());
      this.userMediaStream = null;
    }
  }


  async onTurnOnClickHandler(event)
  {
    await this.initMedia();
  }

  onTakePictureHandler(event)
  {
    const videoElement = this.videoElement.nativeElement;
    const canvasElement = this.canvasElement.nativeElement;

    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;

    const canvasContext = canvasElement.getContext('2d');

    canvasContext.drawImage(videoElement, 0,0, videoElement.videoWidth, videoElement.videoHeight);

    this.isPictureTaken = true;
  }

  onTakenPictureApproveClickHandler(event)
  {
    const canvasElement = this.canvasElement.nativeElement;

    const image64 = canvasElement.toDataURL('image/jpeg', 1.0);
    // @ts-ignore
    const file: File = this.uploadDataService.getFileByBase64(image64, 'image', { type: 'image/jpeg' });
    // @ts-ignore
    const uploadItem: UploadFile = new UploadFile(file);

    this.store.dispatch(new UploadUserAvatarStart(uploadItem));

    this.completeEmitter.emit();
  }

  onTakenPictureRejectClickHandler(event)
  {
    this.isPictureTaken = false;
  }

}
