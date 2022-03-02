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
import {Call} from '../../../data/model/calls/call.model';
import {CallMemberLink} from '../../../data/model/calls/call-member-link.model';
import {ToastrService} from "ngx-toastr";
import {
  IncomingDirectCallToastComponent
} from "../toast/incoming-direct-call-toast/incoming-direct-call-toast.component";
import {CallService} from "../../../services/call.service";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-calls-observer',
  templateUrl: './calls-observer.component.html',
  styleUrls: ['./calls-observer.component.css']
})
export class CallsObserverComponent implements OnInit, OnDestroy {

  callWindowIdSubscription: Subscription;
  incomingCallSubscription: Subscription;
  connectingMemberSubscription: Subscription;
  connectedMemberSubscription: Subscription;
  rejectedMemberSubscription: Subscription;
  hungUpMemberSubscription: Subscription;

  lastIncomingCallSubscription: Subscription;


  lastReceivedIncomingCall: Call = null;

  constructor(
    private store: Store<State>,
    private service: CallService,
    private callSocketService: CallSocketService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {

    this.callWindowIdSubscription = this.callSocketService.getCallConnectionId().subscribe(this.callWindowIdReceivedHandler);

    this.lastIncomingCallSubscription = this
      .store
      .pipe(
        select(state => state.calls.lastDirectedIncomingCall),
        filter(call => !!call)
        )
      .subscribe(this.lastIncomingCallHandler);


    this.incomingCallSubscription = this.callSocketService.getIncomingCall().subscribe(this.incomingCallHandler);
    this.connectingMemberSubscription = this.callSocketService.getConnectingMember().subscribe(this.connectingMemberHandler);
    this.connectedMemberSubscription = this.callSocketService.getConnectedMember().subscribe(this.connectedMemberHandler);
    this.rejectedMemberSubscription = this.callSocketService.getRejectedMember().subscribe(this.rejectedMemberHandler);
    this.hungUpMemberSubscription = this.callSocketService.getHungUpMember().subscribe(this.hungUpMemberHandler);

  }

  ngOnDestroy(): void {

    this.callWindowIdSubscription.unsubscribe();
    this.incomingCallSubscription.unsubscribe();
    this.connectingMemberSubscription.unsubscribe();
    this.connectedMemberSubscription.unsubscribe();
    this.rejectedMemberSubscription.unsubscribe();
    this.hungUpMemberSubscription.unsubscribe();
    this.lastIncomingCallSubscription.unsubscribe();

    this.store.dispatch(new SetCallWindowId(null));
  }

  callWindowIdReceivedHandler = (id: string) => {

    this.store.dispatch(new SetCallWindowId(id));

  }

  lastIncomingCallHandler = (call: Call) => {

    const toast = this.toastService.show('', '', {
      toastComponent: IncomingDirectCallToastComponent,
      positionClass: 'toast-bottom-left',
      disableTimeOut: true
    });

    toast.toastRef.componentInstance.call = call;
    toast
      .toastRef
      .componentInstance
      .acceptEmitter
      .subscribe((call: Call) => {

        this.lastReceivedIncomingCall = call;
        this.toastService.remove(toast.toastId);

      });

    toast
      .toastRef
      .componentInstance
      .rejectEmitter
      .subscribe(async (call: Call) => {

        this.toastService.remove(toast.toastId);

        try {
          await this.service.reject(call).toPromise();
        }
        catch (error)
        {
          console.log(error);
        }
      });
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
