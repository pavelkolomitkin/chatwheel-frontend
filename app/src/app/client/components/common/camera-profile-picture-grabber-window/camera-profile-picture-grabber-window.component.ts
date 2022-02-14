import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {Subscription} from "rxjs";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {UserGrabPictureFromCameraWindow} from "../../../data/actions";

@Component({
  selector: 'app-camera-profile-picture-grabber-window',
  templateUrl: './camera-profile-picture-grabber-window.component.html',
  styleUrls: ['./camera-profile-picture-grabber-window.component.css']
})
export class CameraProfilePictureGrabberWindowComponent implements OnInit, OnDestroy {

  @ViewChild('grabberWindow') contentWindowTemplate: TemplateRef<any>;

  window: NgbModalRef = null

  grabbingPictureWindowStateSubscription: Subscription = null;

  constructor(private store: Store<State>, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.grabbingPictureWindowStateSubscription = this
      .store
      .pipe(select(state => state.client.isGrabbingPictureCameraWindowOpen))
      .subscribe((isOpen: boolean) => {

        if (isOpen)
        {
           this.openWindow();
        }
        else
        {
          this.closeWindow();
        }

      });

  }

  ngOnDestroy(): void {

    if (this.grabbingPictureWindowStateSubscription !== null)
    {
      this.grabbingPictureWindowStateSubscription.unsubscribe();
      this.grabbingPictureWindowStateSubscription = null;
    }

    this.closeWindow();

  }

  openWindow()
  {
    this.window = this.modalService.open(this.contentWindowTemplate, { centered: true });
    this.window.result
      .then((data) => {
        this.store.dispatch(new UserGrabPictureFromCameraWindow(false));
      })
      .catch((error) => {
        this.store.dispatch(new UserGrabPictureFromCameraWindow(false));
      });
  }

  closeWindow()
  {
    if (!!this.window)
    {
      this.window.close();
      this.window = null;
    }
  }

  onCompleteHandler(event)
  {
    this.closeWindow();
  }
}
