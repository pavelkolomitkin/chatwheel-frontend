import {
  Component, HostListener,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../../../../security/data/models/user.model';
import {Call} from '../../../../data/model/calls/call.model';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../app.state";
import {Subscription} from "rxjs";
import {filter, first} from "rxjs/operators";
import {CallMemberLink} from "../../../../data/model/calls/call-member-link.model";
import {CallMemberHungUp, IncomingCallReceived, UserInitiateDirectCall} from "../../../../data/calls/actions";
import {GlobalNotification} from "../../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../../core/data/models/notification.model";
import screenfull from "screenfull";
import {UserReportAbuseInit} from "../../../../data/actions";
import {DeviceDetectorService, DeviceInfo} from 'ngx-device-detector';

@Component({
  selector: 'app-direct-call-window',
  templateUrl: './direct-call-window.component.html',
  styleUrls: ['./direct-call-window.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DirectCallWindowComponent implements OnInit, OnDestroy {

  static WINDOW_SIZE_FULLSCREEN = 'window_size_fullscreen';
  static WINDOW_SIZE_NORMAL = 'window_size_normal';
  windowSize: string = DirectCallWindowComponent.WINDOW_SIZE_NORMAL;

  initiatedCallSubscription: Subscription;
  lastRejectedCallSubscription: Subscription;
  lastReportedUserSubscription: Subscription;
  lastMemberHangUpSubscription: Subscription;

  @ViewChild('modalWindow') templateWindow: TemplateRef<any>;
  window: NgbModalRef = null;

  _initiatedCallAddressee: User = null;
  _incomingCall: Call = null;
  _lastMemberRejected: CallMemberLink = null;
  _lastMemberHungUp: CallMemberLink = null;

  //@ts-ignore
  fullScreenEnabled: boolean = screenfull.enabled;
  isFullScreen: boolean = false;

  authorizedUser: User = null;

  @Input() set incomingCall(value: Call)
  {
    this.closeWindow();

    setTimeout(() => {
      this._incomingCall = value;
      if (this._incomingCall)
      {
        this.openWindow();
      }
    }, 1);
  }

  constructor(
    private store: Store<State>,
    private modal: NgbModal,
    private deviceService: DeviceDetectorService
  ) {
  }

  // @HostListener('window:orientationchange', ['$event'])
  // onOrientationChange(event) {
  //   this.updateOrientationWindowView();
  // }

  updateOrientationWindowView()
  {
    const info: DeviceInfo = this.deviceService.getDeviceInfo();

    if (info.deviceType !== 'mobile')
    {
      return;
    }

    if (!this.window)
    {
      return;
    }

    if (info.orientation === 'portrait')
    {
      this.exitFullScreen();
    }

    if (info.orientation === 'landscape')
    {
      this.setFullScreen();
    }
  }

  initializeFullScreen()
  {
    if (this.fullScreenEnabled)
    {
      // @ts-ignore
      screenfull.on('change', () => {
        // @ts-ignore
        if (!screenfull.isFullscreen && (this.windowSize === DirectCallWindowComponent.WINDOW_SIZE_FULLSCREEN))
        {
          this.windowSize = DirectCallWindowComponent.WINDOW_SIZE_NORMAL;
          this.isFullScreen = false;
        }

      });
    }
  }

  disposeFullScreen()
  {
    if (this.fullScreenEnabled)
    {
      // @ts-ignore
      screenfull.off('change');
    }
  }

  openWindow()
  {
    this.window = this.modal.open(this.templateWindow, {
      centered: true,
      size: 'xl',
      backdrop: false,
    });
    this.window.result
      .then(() => {
        this.cleanUpState();
      })
      .catch(() => {
        this.cleanUpState();
      });

    // this.window.shown.subscribe(() => {
    //   this.updateOrientationWindowView();
    // });
  }

  closeWindow()
  {
    if (this.window)
    {
      this.window.close();
      this.window = null;

      this.cleanUpState();
    }
  }

  async ngOnInit() {

    this.initializeFullScreen();

    this.authorizedUser = await this.store.pipe(
      select(state => state.security.user),
      first())
      .toPromise();

    this.initiatedCallSubscription = this
      .store
      .pipe(select(state => state.calls.lastInitiatedDirectCallAddressee))
      .subscribe(this.lastInitiatedCallHandler);


    this.lastRejectedCallSubscription = this
      .store
      .pipe(
        select(state => state.calls.lastMemberRejectedLink),
      )
      .subscribe(this.lastRejectedMemberLinkHandler);


    this.lastReportedUserSubscription = this.store.pipe(
      select(state => state.client.lastBanStatusChangedUser),
      filter(user => !!user)
    ).subscribe(this.lastBanStatusChangeHandler);

    this.lastMemberHangUpSubscription = this.store.pipe(
      select(state => state.calls.lastMemberHungUpLink),
      filter(link => !!link)
    ).subscribe(this.lastMemberHangUpHandler);

  }

  ngOnDestroy(): void {

    this.lastRejectedCallSubscription.unsubscribe();
    this.initiatedCallSubscription.unsubscribe();
    this.lastReportedUserSubscription.unsubscribe();
    this.lastMemberHangUpSubscription.unsubscribe();

    this.closeWindow();
    this.cleanUpState();

    this.disposeFullScreen();
  }

  cleanLocalState()
  {
    this._initiatedCallAddressee = null;
    this._lastMemberRejected = null;
    this._lastMemberHungUp = null;
    this._incomingCall = null;
  }

  cleanUpState()
  {
    this.store.dispatch(new UserInitiateDirectCall(null));
    this.store.dispatch(new IncomingCallReceived(null));
    this.store.dispatch(new CallMemberHungUp(null));
    this.cleanLocalState();
  }

  lastMemberHangUpHandler = (link: CallMemberLink) => {
    this._lastMemberHungUp = link;
  }

  lastBanStatusChangeHandler = (user: User) => {

    const addressee: User = this.getAddressee();

    if (!addressee)
    {
      return;
    }

    if (addressee.id === user.id)
    {

      if (user.amIBanned || user.isBanned)
      {
        this.closeWindow();

        if (user.amIBanned)
        {
          this.store.dispatch(
            new GlobalNotification(
              new Notification(NotificationType.WARNING, user.fullName + ' has banned you!')
            )
          );
        }
      }

    }
  }

  lastInitiatedCallHandler = (addressee: User) => {

    this._initiatedCallAddressee = addressee;

    this.closeWindow();
    if (!!this._initiatedCallAddressee)
    {
      this.openWindow();
    }
  }

  lastRejectedMemberLinkHandler = (link: CallMemberLink) => {
    this._lastMemberRejected = link;
  }

  onHangUpHandler(call: Call)
  {
    this.closeWindow();
  }

  getAddressee()
  {
    if (!!this._initiatedCallAddressee)
    {
      return this._initiatedCallAddressee;
    }

    if (!!this._incomingCall)
    {
      return this
        ._incomingCall
        .members
        .find(member => member.user.id !== this.authorizedUser.id).user;
    }

    return null;
  }

  isWindowInFullscreenMode()
  {
    return this.windowSize === DirectCallWindowComponent.WINDOW_SIZE_FULLSCREEN;
  }

  fullScreenToggle()
  {
    if (!this.isWindowInFullscreenMode())
    {
      this.setFullScreen();
    }
    else
    {

      this.exitFullScreen();
    }
  }

  setFullScreen()
  {
    if (!this.fullScreenEnabled)
    {
      return;
    }

    this.windowSize = DirectCallWindowComponent.WINDOW_SIZE_FULLSCREEN;
    // @ts-ignore
    const element = this.window._contentRef.viewRef.rootNodes[0];
    // @ts-ignore
    screenfull.request(element);

    this.isFullScreen = true;
  }

  exitFullScreen()
  {
    if (!this.fullScreenEnabled)
    {
      return;
    }

    this.windowSize = DirectCallWindowComponent.WINDOW_SIZE_NORMAL;
    // @ts-ignore
    screenfull.exit();
    this.isFullScreen = false;
  }

  onToggleFullScreenHandler(event)
  {
    this.fullScreenToggle();
  }

  onFullScreenClickHandler(event)
  {
    this.fullScreenToggle();
  }

  onNormalSizeClickHandler(event)
  {
    this.windowSize = DirectCallWindowComponent.WINDOW_SIZE_NORMAL;
    // @ts-ignore
    if (screenfull.isFullscreen)
    {
      this.exitFullScreen();
    }
  }

  onCloseClickHandler(event)
  {
    this.closeWindow();
  }

  onReportAbuseHandler(user: User)
  {
    if (this.isWindowInFullscreenMode())
    {
      this.exitFullScreen();
    }

    this.store.dispatch(new UserReportAbuseInit(user));
  }
}
