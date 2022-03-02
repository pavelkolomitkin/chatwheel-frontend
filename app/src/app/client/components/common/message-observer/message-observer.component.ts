import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {MessageSocketService} from "../../../services/sockets/message-socket.service";
import {MessageEdited, MessageReceived, MessageRemoved, UserUpdateNewMessageNumberSuccess} from "../../../data/actions";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {IncomingMessageComponent} from "../toast/incoming-message/incoming-message.component";
import {User} from "../../../../security/data/models/user.model";
import {first} from "rxjs/operators";
import {ConversationMessageList} from "../../../../core/data/models/messages/conversation-message-list.model";

@Component({
  selector: 'app-message-observer',
  templateUrl: './message-observer.component.html',
  styleUrls: ['./message-observer.component.css']
})
export class MessageObserverComponent implements OnInit, OnDestroy {

  user: User;

  newMessageNumberSubscription: Subscription;
  messageAddedSubscription: Subscription;
  messageEditedSubscription: Subscription;
  messageRemovedSubscription: Subscription;
  conversationOpenSubscription: Subscription;

  openedConversation: ConversationMessageList = null;

  constructor(
    private store: Store<State>,
    private messageSocket: MessageSocketService,
    private toastService: ToastrService
  ) { }

  async ngOnInit() {

    this.user = await this.store.pipe(select(state => state.security.user), first()).toPromise();

    this.newMessageNumberSubscription = this.messageSocket.getNewMessageNumber().subscribe(this.newMessageChangedHandler);
    this.messageAddedSubscription = this.messageSocket.getAddedMessage().subscribe(this.messageAddedHandler);
    this.messageEditedSubscription = this.messageSocket.getEditedMessage().subscribe(this.messageEditedHandler)
    this.messageRemovedSubscription = this.messageSocket.getRemovedMessage().subscribe(this.messageRemovedHandler);
    this.conversationOpenSubscription = this.store.pipe(select(state => state.client.openedConversation))
      .subscribe(this.onConversationWindowChangeHandler);
  }

  ngOnDestroy(): void {
    this.newMessageNumberSubscription.unsubscribe();
    this.messageAddedSubscription.unsubscribe();
    this.messageEditedSubscription.unsubscribe();
    this.messageRemovedSubscription.unsubscribe();
    this.conversationOpenSubscription.unsubscribe();
  }

  onConversationWindowChangeHandler = (conversation: ConversationMessageList) => {
    this.openedConversation = conversation;
  }


  newMessageChangedHandler = (messageNumber: number) =>
  {
    this.store.dispatch(new UserUpdateNewMessageNumberSuccess(messageNumber));
  }

  messageAddedHandler = (message) =>
  {
    this.store.dispatch(new MessageReceived(message));

    const isUserAuthor: boolean = this.user.id === message.message.message.author.id;
    const isConversationWindowOpened: boolean = !!this.openedConversation && (
      message.messageList.id === this.openedConversation.id
    );

    if (!isUserAuthor && !isConversationWindowOpened)
    {
      const toast = this.toastService.show('', '', {
        toastComponent: IncomingMessageComponent,
        positionClass: 'toast-bottom-right',
        disableTimeOut: false
      });

      // @ts-ignore
      toast.toastRef.componentInstance.message = message;
      toast.toastRef.componentInstance.toastId = toast.toastId;

      // setTimeout(() => {
      //   this.toastService.remove(toast.toastId);
      // }, 5000);
    }
  }


  messageEditedHandler = (data) =>
  {
    this.store.dispatch(new MessageEdited(data));
  }

  messageRemovedHandler = (data) =>
  {
    this.store.dispatch(new MessageRemoved(data))
  }
}
