import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {CallSocketService} from '../../../services/sockets/call-socket.service';
import {
  CallMemberConnected,
  CallMemberConnecting, CallMemberHungUp, CallMemberRejected,
  IncomingCallReceived,
  SetCallWindowId
} from '../../../data/calls/actions';
import {Subscription} from 'rxjs';
import {User} from '../../../../security/data/models/user.model';
import {Call} from '../../../data/model/calls/call.model';
import {CallMemberLink} from '../../../data/model/calls/call-member-link.model';

@Component({
  selector: 'app-calls-observer',
  templateUrl: './calls-observer.component.html',
  styleUrls: ['./calls-observer.component.css']
})
export class CallsObserverComponent implements OnInit, OnDestroy {

  callWindowIdSubscription: Subscription;
  initiatedCallSubscription: Subscription;
  incomingCallSubscription: Subscription;
  connectingMemberSubscription: Subscription;
  connectedMemberSubscription: Subscription;
  rejectedMemberSubscription: Subscription;
  hungUpMemberSubscription: Subscription;

  lastInitiatedCallAddressee: User = null;

  constructor(
    private store: Store<State>,
    private callSocketService: CallSocketService
  ) { }

  ngOnInit(): void {

    this.callWindowIdSubscription = this.callSocketService.getCallConnectionId().subscribe(this.callWindowIdReceivedHandler);

    this.initiatedCallSubscription = this
      .store
      .pipe(select(state => state.calls.lastInitiatedDirectCallAddressee))
      .subscribe(this.lastInitiatedCallHandler);


    this.incomingCallSubscription = this.callSocketService.getIncomingCall().subscribe(this.incomingCallHandler);
    this.connectingMemberSubscription = this.callSocketService.getConnectingMember().subscribe(this.connectingMemberHandler);
    this.connectedMemberSubscription = this.callSocketService.getConnectedMember().subscribe(this.connectedMemberHandler);
    this.rejectedMemberSubscription = this.callSocketService.getRejectedMember().subscribe(this.rejectedMemberHandler);
    this.hungUpMemberSubscription = this.callSocketService.getHungUpMember().subscribe(this.hungUpMemberHandler);

  }

  ngOnDestroy(): void {

    this.callWindowIdSubscription.unsubscribe();
    this.initiatedCallSubscription.unsubscribe();
    this.incomingCallSubscription.unsubscribe();
    this.connectingMemberSubscription.unsubscribe();
    this.connectedMemberSubscription.unsubscribe();
    this.rejectedMemberSubscription.unsubscribe();
    this.hungUpMemberSubscription.unsubscribe();

    this.store.dispatch(new SetCallWindowId(null));
  }

  callWindowIdReceivedHandler = (id: string) => {

    this.store.dispatch(new SetCallWindowId(id));

  }

  lastInitiatedCallHandler = (addressee: User) => {

    this.lastInitiatedCallAddressee = addressee;
  }

  incomingCallHandler = (call: Call) => {

    this.store.dispatch(new IncomingCallReceived(call));
  }

  connectingMemberHandler = (link: CallMemberLink) => {
    this.store.dispatch(new CallMemberConnecting(link));
  }

  connectedMemberHandler = (link: CallMemberLink) => {
    this.store.dispatch(new CallMemberConnected(link));
  }

  rejectedMemberHandler = (link: CallMemberLink) => {
    this.store.dispatch(new CallMemberRejected(link));
  }

  hungUpMemberHandler = (link: CallMemberLink) => {
    this.store.dispatch(new CallMemberHungUp(link));
  }

}
