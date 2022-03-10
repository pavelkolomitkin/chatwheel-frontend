import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {User} from '../../../../../security/data/models/user.model';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../../app.state';
import {CallConnectorService} from '../../../../services/calls/call-connector.service';
import {first} from 'rxjs/operators';
import {CallConnection} from '../../../../services/calls/call-connection';
import {Subscription} from 'rxjs';
import {Call} from '../../../../data/model/calls/call.model';
import {CallMemberLink} from "../../../../data/model/calls/call-member-link.model";
import {CallMemberRejected} from "../../../../data/calls/actions";
import {ConversationMessage} from "../../../../../core/data/models/messages/conversation-message.model";
import {MessageType} from "../../../../../core/data/models/messages/message.model";

@Component({
  selector: 'app-direct-call',
  templateUrl: './direct-call.component.html',
  styleUrls: ['./direct-call.component.css']
})
export class DirectCallComponent implements OnInit, OnDestroy {

  @Output('onHangUp') hangUpEmitter: EventEmitter<Call> = new EventEmitter<Call>();
  @Output('onDoubleClickRemote') doubleClickRemoteVideoEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output('onReportAbuse') reportAbuseEmitter: EventEmitter<User> = new EventEmitter<User>();

  static UI_STATE_CALLING_ADDRESSEE = 'calling_addressee';
  static UI_STATE_RECEIVING_CALL = 'receiving_call';
  static UI_STATE_CALL_REJECTED = 'call_rejected';
  static UI_STATE_CALL_ADDRESSEE_HUNG_UP = 'addressee_hung_up';
  static UI_STATE_CALL_IN_PROGRESS = 'call_in_progress';
  static UI_STATE_ERROR = 'call_error';

  @ViewChild('remoteVideo') remoteVideoElement: ElementRef;
  @ViewChild('localVideo') localVideoElement: ElementRef;

  uiState: string;

  _initiatedToAddressee: User = null;
  _receivingCall: Call = null;
  _rejectedMember: CallMemberLink = null;
  _hungUpMember: CallMemberLink = null;

  _addressee: User = null;

  @Input() authorizedUser: User = null;

  callConnection: CallConnection = null;

  localStream: MediaStream = null;
  remoteStream: MediaStream = null;
  error: string = null;

  isTextChatVisible: boolean = false;

  localStreamSubscription: Subscription = null;
  remoteStreamSubscription: Subscription = null;
  errorSubscription: Subscription = null;

  @Input() set initiateToAddressee (value: User)
  {
    this._initiatedToAddressee = value;

    if (this._initiatedToAddressee)
    {
      this._addressee = this._initiatedToAddressee;

      (async () => {
        await this.callAddressee();
      })();
    }
  }

  @Input() set receivingCall(value: Call)
  {
    this._receivingCall = value;

    if (this._receivingCall)
    {
      this._addressee = this.getAddressee();

      (async () => {
        await this.receiveCall();
      })();
    }

  }

  @Input() set rejectedMember(value: CallMemberLink)
  {
    this._rejectedMember = value;

    this.rejectCall();
  }

  @Input() set hungUpMember(value: CallMemberLink)
  {
    this._hungUpMember = value;

    this.hangUpCall();
  }

  constructor(
    private store: Store<State>,
    private callConnector: CallConnectorService,
  ) { }

  async ngOnInit() {

  }

  async ngOnDestroy() {

    try {
      if (this.callConnection && this.callConnection.isInitialized())
      {
        await this.callConnection.hangUp();
      }
      else if (!!this._initiatedToAddressee)
      {
        await this.callConnection.hangUp();
      }
      else if (!!this._receivingCall)
      {
        await this.callConnection.reject();
      }
    }
    catch (error)
    {}

    await this.releaseCallConnection();
    this.releaseCallSubscriptions();
  }

  async callAddressee()
  {
    if (this._initiatedToAddressee !== null)
    {
      this.uiState = DirectCallComponent.UI_STATE_CALLING_ADDRESSEE;

      const preserveLocalStream: boolean = !!this.localStream;

      await this.releaseCallConnection(preserveLocalStream);
      this.releaseCallSubscriptions();

      const socketWindowId: string = await this.store.pipe(select(state => state.calls.callWindowId), first()).toPromise();

      this.callConnection = this.callConnector.call(this._initiatedToAddressee, socketWindowId, true);
      this.callConnection.setUserMedia(this.localStream);

      await this.initiateCallConnection();
    }
  }

  async receiveCall()
  {
    if (this._receivingCall !== null)
    {
      this.uiState = DirectCallComponent.UI_STATE_RECEIVING_CALL;

      await this.releaseCallConnection();
      this.releaseCallSubscriptions();

      const socketWindowId: string = await this.store.pipe(select(state => state.calls.callWindowId), first()).toPromise();

      this.callConnection = this.callConnector.receive(this._receivingCall, socketWindowId);

      await this.initiateCallConnection();
    }
  }

  rejectCall()
  {
    if (!this._rejectedMember || !this.callConnection)
    {
      return;
    }

    const currentCall: Call = this.callConnection.getCall();
    if (!currentCall)
    {
      return;
    }

    const callId: string = this._rejectedMember.call;

    if (callId === currentCall.id)
    {
      this.uiState = DirectCallComponent.UI_STATE_CALL_REJECTED;
    }
  }

  hangUpCall()
  {
    if (!this._hungUpMember || !this.callConnection)
    {
      return;
    }

    const currentCall: Call = this.callConnection.getCall();
    const callId: string = this._hungUpMember.call;

    if (callId === currentCall.id)
    {
      this.uiState = DirectCallComponent.UI_STATE_CALL_ADDRESSEE_HUNG_UP;
    }

  }

  localStreamsReadyHandler = (stream: MediaStream) => {
    if (!this.localStream)
    {
      this.localStream = stream;
      this.localVideoElement.nativeElement.srcObject = stream;
    }
  }

  remoteStreamReadyHandler = (stream: MediaStream) => {

    this.remoteStream = stream;

    this.remoteVideoElement.nativeElement.srcObject = stream;

    this.uiState = DirectCallComponent.UI_STATE_CALL_IN_PROGRESS;
  }

  connectionErrorHandler = (error) => {
    this.error = error;

    this.uiState = DirectCallComponent.UI_STATE_ERROR;
  }

  onCallAgainClickHandler = async (event) => {

    this.store.dispatch(new CallMemberRejected(null));

    this._initiatedToAddressee = this.getAddressee();
    await this.callAddressee();
  }

  onHangUpClickHandler = async (event) => {
    try {

      if (this.callConnection.isInitialized())
      {
        await this.callConnection.hangUp();
      }
      else
      {
        await this.callConnection.reject();
      }

      this._initiatedToAddressee = null;
      this._receivingCall = null;

      const call: Call = this.callConnection.getCall();
      this.hangUpEmitter.emit(call);
    }
    catch (error)
    {
      console.error(error);
    }
  }

  onReportAbuseClickHandler = async (event) => {

    const addressee: User = this.getAddressee();
    this.reportAbuseEmitter.emit(addressee)
  }

  getAddressee()
  {
    let result: User = null;

    if (!!this._initiatedToAddressee)
    {
      result = this._initiatedToAddressee;
    }
    else
    {
      result = this
        ._receivingCall
        .members
        .find(member => member.user.id !== this.authorizedUser.id)
        .user;
    }

    return result;
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
      this.error = error.message || error.error.errors.message;
      // display the error message at the center of canvas to make it conspicuous
      this.uiState = DirectCallComponent.UI_STATE_ERROR;
    }
  }

  async releaseCallConnection(preserveLocalMedia: boolean = false)
  {
    if (this.callConnection !== null)
    {
      await this.callConnection.release(preserveLocalMedia);
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

  onDoubleClickRemoteVideoHandler(event)
  {
    this.doubleClickRemoteVideoEmitter.emit();
  }

  onTextChatButtonClickHandler(event)
  {
    this.isTextChatVisible = true
  }

  onTextChatCloseHandler(event)
  {
    this.isTextChatVisible = false;
  }

  onRemoteVideoClickHandler(event)
  {
    this.isTextChatVisible = false;
  }

  onMessageReceivedHandler(message: ConversationMessage)
  {
    if (message.message.type === MessageType.TEXT)
    {
      this.isTextChatVisible = true;
    }
  }
}
