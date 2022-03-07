import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../app.state";
import {ChatRouletteService} from "../../../../services/search/chat-roulette.service";
import {ChatRouletteSocketService} from "../../../../services/sockets/chat-roulette-socket.service";
import {ChatRouletteOffer, ChatRouletteOfferType} from "../../../../data/model/search/chat-roulette-offer.model";
import {Observable, Subscription} from "rxjs";
import {User} from "../../../../../security/data/models/user.model";
import {first} from "rxjs/operators";
import screenfull from "screenfull";
import {UserMediaService} from "../../../../../core/services/user-media.service";
import {UploadDataService} from "../../../../../core/services/upload/upload-data.service";
import {GlobalNotification} from "../../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../../core/data/models/notification.model";
import {CallSocketService} from "../../../../services/sockets/call-socket.service";
import {Call} from "../../../../data/model/calls/call.model";
import {CallConnection} from "../../../../services/calls/call-connection";
import {CallConnectorService} from "../../../../services/calls/call-connector.service";
import {environment} from "../../../../../../environments/environment";
import {UserReportAbuseInit} from "../../../../data/actions";

@Component({
  selector: 'app-chatwheel',
  templateUrl: './chatwheel.component.html',
  styleUrls: ['./chatwheel.component.css']
})
export class ChatwheelComponent implements OnInit, OnDestroy {

  static UI_STATE_MEDIA_INITIALIZE_ERROR = 'media_initialize_error';

  static UI_STATE_CHAT_STOPPED = 'chat_stopped';
  static UI_STATE_CHAT_SEARCHING = 'chat_searching';
  static UI_STATE_CHAT_OFFER_MADE = 'chat_offer_made';
  static UI_STATE_CHAT_OFFER_ACCEPTED = 'chat_offer_accepted';
  static UI_STATE_CHAT_ADDRESSEE_CONNECTING = 'chat_addressee_connecting';
  static UI_STATE_CHAT_CALLING = 'chat_addressee_calling';

  uiState: string = ChatwheelComponent.UI_STATE_CHAT_STOPPED;

  //@ts-ignore
  fullScreenEnabled: boolean = screenfull.enabled;

  isFullScreen: boolean = false;

  @ViewChild('videoArea') videoArea: ElementRef;
  @ViewChild('remoteVideo') remoteVideo: ElementRef;
  @ViewChild('localVideo') localVideo: ElementRef;
  @ViewChild('takePictureArea') takePictureArea: ElementRef;

  addressee: User = null;
  authorizedUser: Observable<User>;

  localMediaStream: MediaStream = null;
  remoteMediaStream: MediaStream = null;

  currentOffer: ChatRouletteOffer = null;
  awaitingAcceptedCallTimeout: any = null;
  awaitingAcceptingCallTimeout: any = null;

  callConnection: CallConnection = null;

  acceptOfferSubscription: Subscription;
  incomingCallSubscription: Subscription;

  //=========== CALL SUBSCRIPTIONS ==============

  remoteStreamSubscription: Subscription = null;
  errorSubscription: Subscription = null;

  //=========// CALL SUBSCRIPTIONS ==============

  constructor(
    private store: Store<State>,
    private searchService: ChatRouletteService,
    private socketService: ChatRouletteSocketService,
    private callSocketService: CallSocketService,
    private mediaService: UserMediaService,
    private uploadDataService: UploadDataService,
    private callConnector: CallConnectorService,
  ) { }

  async ngOnInit() {

    this.initializeFullScreen();
    await this.initializeLocalMedia();

    this.authorizedUser = this.store.pipe(select(state => state.security.user));

    this.acceptOfferSubscription = this.socketService.getAcceptedOffer().subscribe(this.onAcceptOfferHandler);
    this.incomingCallSubscription = this.callSocketService.getIncomingCall().subscribe(this.getIncomingCallHandler);



  }

  async ngOnDestroy() {

    this.acceptOfferSubscription.unsubscribe();
    this.incomingCallSubscription.unsubscribe();

    this.disposeFullScreen();
    await this.disposeLocalMedia();

    await this.releaseCallConnection();
    await this.releaseCallSubscriptions();

    this.releaseAwaitingAcceptingCallTimeout();
    this.releaseAwaitingAcceptedCallTimeout();
  }

  async searchPartner()
  {
    debugger
    if (this.uiState === ChatwheelComponent.UI_STATE_CHAT_STOPPED)
    {
      return;
    }

    this.uiState = ChatwheelComponent.UI_STATE_CHAT_SEARCHING;
    this.currentOffer = null;

    // try to find or create a new offer
    try {
      this.currentOffer = await this.searchService.search().toPromise();
    }
    catch (error)
    {
      this.store.dispatch(new GlobalNotification(
        new Notification(NotificationType.ERROR, 'Cannot start the wheel! Try it later!', 'Error')
      ));

      return;
    }

    // depending on the offer type make or await a call from the addressee
    const { type } = this.currentOffer;
    if (type === ChatRouletteOfferType.SEARCH_PARTNER_FOUND)
    {
      // accept the found offer
      try {
        this.currentOffer = await this.searchService.acceptOffer(this.currentOffer).toPromise();
        this.uiState = ChatwheelComponent.UI_STATE_CHAT_OFFER_ACCEPTED;

        this.awaitAcceptedCall();

      }
      catch (error)
      {
        this.uiState = ChatwheelComponent.UI_STATE_CHAT_STOPPED;
        // release the connection preserving the local media
        return;
      }
    }
    else if (type === ChatRouletteOfferType.SEARCH_PARTNER_OFFERED)
    {
      this.uiState = ChatwheelComponent.UI_STATE_CHAT_OFFER_MADE;
      this.awaitAcceptingCall();
    }

  }

  awaitAcceptedCall()
  {
    this.awaitingAcceptedCallTimeout = setTimeout( async () => {
      await this.searchPartner();
    }, environment.chatRouletteAwaitAcceptedCallTimeout);
  }

  releaseAwaitingAcceptedCallTimeout()
  {
    if (!!this.awaitingAcceptedCallTimeout)
    {
      clearTimeout(this.awaitingAcceptedCallTimeout);
      this.awaitingAcceptedCallTimeout = null;
    }
  }

  awaitAcceptingCall()
  {
    this.awaitingAcceptingCallTimeout = setTimeout(async () => {
      await this.searchPartner();
    }, environment.chatRouletteAwaitAcceptedCallTimeout);
  }

  releaseAwaitingAcceptingCallTimeout()
  {
    if (!!this.awaitingAcceptingCallTimeout)
    {
      clearTimeout(this.awaitingAcceptingCallTimeout);
      this.awaitingAcceptingCallTimeout = null;
    }
  }

  getIncomingCallHandler = async (call: Call) => {

    debugger
    if (!this.isOfferCall(call))
    {
      return;
    }

    this.releaseAwaitingAcceptedCallTimeout();
    this.uiState = ChatwheelComponent.UI_STATE_CHAT_ADDRESSEE_CONNECTING;

    await this.receiveCall(call);
  }

  onAcceptOfferHandler = async (offer: ChatRouletteOffer) => {

    debugger
    //offer.type
    if (!this.currentOffer)
    {
      return;
    }

    if (this.currentOffer.id !== offer.id)
    {
      return;
    }

    this.releaseAwaitingAcceptingCallTimeout();
    this.currentOffer = offer;

    this.uiState = ChatwheelComponent.UI_STATE_CHAT_OFFER_ACCEPTED;

    await this.makeCall();
  }

  isOfferCall(call: Call): boolean
  {
    if (!this.currentOffer)
    {
      return false;
    }

    if (call.isDirect)
    {
      return false;
    }

    const member = call.members.find(member => member.user.id === this.currentOffer.addressee.id);
    return !!member;
  }


  async initializeLocalMedia()
  {
    try {
      // @ts-ignore
      this.localMediaStream = await this.mediaService.getUserMedia(true, true);
      this.localVideo.nativeElement.srcObject = this.localMediaStream;

      this.uiState = ChatwheelComponent.UI_STATE_CHAT_STOPPED;
    }
    catch (error)
    {
      this.uiState = ChatwheelComponent.UI_STATE_MEDIA_INITIALIZE_ERROR;
    }
  }

  async disposeLocalMedia()
  {
    if (!!this.localMediaStream)
    {
      this.localMediaStream.getTracks().forEach(track => track.stop());
    }
  }

  initializeFullScreen()
  {
    if (this.fullScreenEnabled)
    {
      // @ts-ignore
      screenfull.on('change', () => {
        // @ts-ignore
        if (!screenfull.isFullscreen && this.isFullScreen)
        {
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

  async onTryAgainMediaClickHandler(event)
  {
    await this.initializeLocalMedia();
  }

  //==================================== MAKING AND RECEIVING CALLS ==============================

  async releaseCallConnection()
  {
    if (this.callConnection)
    {
      await this.callConnection.release(true);
    }
  }

  releaseCallSubscriptions()
  {
    if (this.remoteStreamSubscription !== null)
    {
      this.remoteStreamSubscription.unsubscribe();
      this.remoteStreamSubscription = null;
    }

    if (this.errorSubscription !== null)
    {
      this.errorSubscription.unsubscribe();
      this.errorSubscription = null;
    }
  }

  async receiveCall(call: Call)
  {
    // release all the resources concerning the callConnection preserving localMedia
    await this.releaseCallConnection();

    // release all the call connection subscriptions
    this.releaseCallSubscriptions();

    // take the current socketId related to the window
    const socketWindowId: string = await this.store.pipe(
      select(state => state.calls.callWindowId),
      first()
    ).toPromise();

    // create a call connection that will receive the call
    this.callConnection = this.callConnector.receive(call, socketWindowId);

    // initiate the call connection
    await this.initiateCallConnection();
  }

  async makeCall()
  {
    // release all the resources concerning the callConnection preserving localMedia
    await this.releaseCallConnection();

    // release all the call connection subscriptions
    this.releaseCallSubscriptions();

    // take the current socketId related to the window
    const socketWindowId: string = await this.store.pipe(
      select(state => state.calls.callWindowId),
      first()
    ).toPromise();

    this.callConnection = this.callConnector.call(this.currentOffer.addressee, socketWindowId, false);
    this.callConnection.setUserMedia(this.localMediaStream);

    // initiate the call connection
    await this.initiateCallConnection();
  }

  async initiateCallConnection()
  {
    this.remoteStreamSubscription = this.callConnection.getRemoteMediaStream().subscribe(this.remoteStreamReadyHandler);
    this.errorSubscription = this.callConnection.getErrors().subscribe(this.connectionErrorHandler);

    try {
      await this.callConnection.initiate();
    }
    catch (error)
    {
      console.error(error);

      await this.searchPartner();
    }
  }

  remoteStreamReadyHandler = (stream: MediaStream) => {

    this.remoteMediaStream = stream;

    this.remoteVideo.nativeElement.srcObject = stream;

    this.uiState = ChatwheelComponent.UI_STATE_CHAT_CALLING;
  }

  connectionErrorHandler = async (error) => {

    await this.searchPartner();

  }

  //==================================// MAKING AND RECEIVING CALLS ==============================

  fullScreenToggle()
  {
    // @ts-ignore
    if (!screenfull.isFullscreen)
    {
      // @ts-ignore
      screenfull.request(this.videoArea.nativeElement);
      this.isFullScreen = true;
    }
    else
    {
      // @ts-ignore
      screenfull.exit();
    }
  }

  onRemoteVideoDoubleClickHandler(event)
  {
    this.fullScreenToggle();
  }

  onFullscreenClickHandler(event)
  {
    this.fullScreenToggle();
  }

  onNormalizeSizeClickHandler(event)
  {
    this.fullScreenToggle();
  }

  takePictureFromCamera(): File
  {
    const localVideoElement = this.localVideo.nativeElement;
    const canvas = this.takePictureArea.nativeElement;

    canvas.width = localVideoElement.videoWidth;
    canvas.height = localVideoElement.videoHeight;

    const canvasContext = canvas.getContext('2d');

    canvasContext.drawImage(localVideoElement, 0,0, localVideoElement.videoWidth, localVideoElement.videoHeight);

    const image64 = canvas.toDataURL('image/jpeg', 1.0);
    // @ts-ignore
    const file: File = this.uploadDataService.getFileByBase64(image64, 'image', { type: 'image/jpeg' });
    return file;
  }

  async turnOnChat()
  {
    try {
      // take the picture from the camera
      // create a file: File object
      const imageFile: File = this.takePictureFromCamera();
      // turn on the play mode
      await this.searchService.turnOn(imageFile).toPromise();
      debugger
    }
    catch (error)
    {
      debugger
      this.store.dispatch(new GlobalNotification(
        new Notification(NotificationType.ERROR, 'Cannot start the wheel! Try it later!', 'Error')
      ));

      return;
    }
  }



  async onStartChatClickHandler(event)
  {
    await this.turnOnChat();

    debugger
    await this.searchPartner();
  }

  async onNextChatClickHandler(event)
  {
    await this.searchPartner();
  }

  async onStopChatClickHandler(event)
  {
    this.uiState = ChatwheelComponent.UI_STATE_CHAT_STOPPED;

    await this.releaseCallConnection();
    this.releaseCallSubscriptions();

    this.releaseAwaitingAcceptedCallTimeout();
    this.releaseAwaitingAcceptedCallTimeout();
  }

  onReportAbuseClickHandler(event)
  {
    if (!this.currentOffer)
    {
      return;
    }

    // @ts-ignore
    screenfull.exit();

    this.store.dispatch(new UserReportAbuseInit(this.currentOffer.addressee));
  }

  onMessageButtonClickHandler(event)
  {

  }

}
