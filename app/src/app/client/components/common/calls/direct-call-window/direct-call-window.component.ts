import {Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {User} from "../../../../../security/data/models/user.model";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../app.state";
import {CallConnectorService} from "../../../../services/calls/call-connector.service";
import {first} from "rxjs/operators";
import {CallConnection} from "../../../../services/calls/call-connection";
import {Subscription} from "rxjs";
import {Call} from "../../../../data/model/calls/call.model";

@Component({
  selector: 'app-direct-call-window',
  templateUrl: './direct-call-window.component.html',
  styleUrls: ['./direct-call-window.component.css']
})
export class DirectCallWindowComponent implements OnInit, OnDestroy {

  static WINDOW_SIZE_FULLSCREEN = 'window_size_fullscreen';
  static WINDOW_SIZE_NORMAL = 'window_size_normal';
  static WINDOW_SIZE_MINIMIZED = 'window_size_minimized';

  static UI_STATE_CALLING_ADDRESSEE = 'calling_addressee';
  static UI_STATE_RECEIVING_CALL = 'receiving_call';
  static UI_STATE_CALL_IN_PROGRESS = 'call_in_progress';
  static UI_STATE_ERROR = 'call_error';

  @ViewChild('remoteVideo') remoteVideoElement: ElementRef;
  @ViewChild('localVideo') localVideoElement: ElementRef;

  windowSize: string = DirectCallWindowComponent.WINDOW_SIZE_NORMAL;
  windowShown: boolean = false;

  uiState: string;

  _initiatedToAddressee: User = null;
  _receivingCall: Call = null;

  authorizedUser: User;

  callConnection: CallConnection = null;

  localStream: MediaStream = null;
  remoteStream: MediaStream = null;
  error: Error = null;

  localStreamSubscription: Subscription = null;
  remoteStreamSubscription: Subscription = null;
  errorSubscription: Subscription = null;

  @Input() set initiateToAddressee (value: User)
  {
    //debugger
    this.windowShown = false;

    this._initiatedToAddressee = value;
    this.windowShown = !!this._initiatedToAddressee;

    (async () => {
      await this.callAddressee();
    })();
  }

  @Input() set receivingCall(value: Call)
  {
    this.windowShown = false;

    this._receivingCall = value;
    this.windowShown = !!this._receivingCall;

    (async () => {
      await this.receiveCall();
    })();
  }

  constructor(
    private store: Store<State>,
    private callConnector: CallConnectorService
  ) { }

  async ngOnInit() {
    this.authorizedUser = await this.store.pipe(select(state => state.security.user), first()).toPromise();
  }

  async ngOnDestroy() {

    await this.releaseCallConnection();

    this.releaseCallSubscriptions();
  }

  async callAddressee()
  {
    if (this._initiatedToAddressee !== null)
    {
      this.uiState = DirectCallWindowComponent.UI_STATE_CALLING_ADDRESSEE;

      await this.releaseCallConnection();
      this.releaseCallSubscriptions();

      //debugger
      const socketWindowId: string = await this.store.pipe(select(state => state.calls.callWindowId), first()).toPromise();
      this.callConnection = this.callConnector.call(this._initiatedToAddressee, socketWindowId, true);

      await this.initiateCallConnection();
    }
  }

  async receiveCall()
  {
    if (this._receivingCall !== null)
    {
      this.uiState = DirectCallWindowComponent.UI_STATE_RECEIVING_CALL;

      await this.releaseCallConnection();
      this.releaseCallSubscriptions();

      const socketWindowId: string = await this.store.pipe(select(state => state.calls.callWindowId), first()).toPromise();

      this.callConnection = this.callConnector.receive(this._receivingCall, socketWindowId);

      await this.initiateCallConnection();
    }
  }

  localStreamsReadyHandler = (stream: MediaStream) => {
    this.localStream = stream;
    // turn off local audio

    this.localVideoElement.nativeElement.srcObject = stream;
  }

  remoteStreamReadyHandler = (stream: MediaStream) => {
    this.remoteStream = stream;

    this.remoteVideoElement.nativeElement.srcObject = stream;

    this.uiState = DirectCallWindowComponent.UI_STATE_CALL_IN_PROGRESS;
  }

  connectionErrorHandler = (error) => {
    this.error = error;

    this.uiState = DirectCallWindowComponent.UI_STATE_ERROR;
  }

  async initiateCallConnection()
  {
    this.localStreamSubscription = this.callConnection.getLocalMediaStream().subscribe(this.localStreamsReadyHandler);
    this.remoteStreamSubscription = this.callConnection.getRemoteMediaStream().subscribe(this.remoteStreamReadyHandler);
    this.errorSubscription = this.callConnection.getErrors().subscribe(this.connectionErrorHandler);

    try {
      await this.callConnection.initiate();
    }
    catch (error)
    {
      // set the interface to the error state
      this.error = error;
      // display the error message at the center of canvas to make it conspicuous
      this.uiState = DirectCallWindowComponent.UI_STATE_ERROR;
    }
  }

  async releaseCallConnection()
  {
    if (this.callConnection !== null)
    {
      await this.callConnection.release();
      this.callConnection = null;
    }
  }

  releaseCallSubscriptions()
  {
    if (this.localStreamSubscription !== null)
    {
      this.localStreamSubscription.unsubscribe();
      this.localStreamSubscription = null;
    }

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

}
