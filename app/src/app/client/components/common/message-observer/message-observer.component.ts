import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {MessageSocketService} from "../../../services/sockets/message-socket.service";
import {MessageEdited, MessageReceived, MessageRemoved, UserUpdateNewMessageNumberSuccess} from "../../../data/actions";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-message-observer',
  templateUrl: './message-observer.component.html',
  styleUrls: ['./message-observer.component.css']
})
export class MessageObserverComponent implements OnInit, OnDestroy {


  newMessageNumberSubscription: Subscription;
  messageAddedSubscription: Subscription;
  messageEditedSubscription: Subscription;
  messageRemovedSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private messageSocket: MessageSocketService
  ) { }

  ngOnInit(): void {

    this.newMessageNumberSubscription = this.messageSocket.getNewMessageNumber().subscribe(this.newMessageChangedHandler);
    this.messageAddedSubscription = this.messageSocket.getAddedMessage().subscribe(this.messageAddedHandler);
    this.messageEditedSubscription = this.messageSocket.getEditedMessage().subscribe(this.messageEditedHandler)
    this.messageRemovedSubscription = this.messageSocket.getRemovedMessage().subscribe(this.messageRemovedHandler);
  }

  ngOnDestroy(): void {
    this.newMessageNumberSubscription.unsubscribe();
    this.messageAddedSubscription.unsubscribe();
    this.messageEditedSubscription.unsubscribe();
    this.messageRemovedSubscription.unsubscribe();
  }

  newMessageChangedHandler(messageNumber: number)
  {
    this.store.dispatch(new UserUpdateNewMessageNumberSuccess(messageNumber));
  }

  messageAddedHandler(message)
  {
    this.store.dispatch(new MessageReceived(message));
  }

  messageEditedHandler(data)
  {
    this.store.dispatch(new MessageEdited(data));
  }

  messageRemovedHandler(data)
  {
    this.store.dispatch(new MessageRemoved(data))
  }
}
