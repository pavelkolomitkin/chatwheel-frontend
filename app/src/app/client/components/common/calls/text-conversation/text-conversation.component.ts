import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {User} from "../../../../../security/data/models/user.model";
import {ConversationMessageList} from "../../../../../core/data/models/messages/conversation-message-list.model";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../app.state";
import {UserConversationService} from "../../../../services/user-conversation.service";
import {ConversationMessage} from "../../../../../core/data/models/messages/conversation-message.model";
import {ConversationClose, ConversationOpen, MessageActionStateReset} from "../../../../data/actions";
import {ConversationMessageService} from "../../../../services/conversation-message.service";
import {filter} from "rxjs/operators";
import {RemovedMessage} from "../../../../data/model/messages/removed-message.model";
import {Subscription} from "rxjs";
import {ReceivedMessage} from "../../../../data/model/messages/received-message.model";
import {EditedMessage} from "../../../../data/model/messages/edited-message.model";
import {GlobalNotification} from "../../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../../core/data/models/notification.model";

@Component({
  selector: 'app-text-conversation',
  templateUrl: './text-conversation.component.html',
  styleUrls: ['./text-conversation.component.css']
})
export class TextConversationComponent implements OnInit, OnDestroy {

  @Output('onClose') closeEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output('onMessageReceived') messageReceivedEmitter: EventEmitter<ConversationMessage> = new EventEmitter<ConversationMessage>();

  @Input() addressee: User;

  @Input() authorizedUser: User;


  @ViewChild('messageListContainer') messageListContainer: ElementRef;

  receivedMessageSubscription: Subscription = null;
  removedMessageSubscription: Subscription = null;
  editedMessageSubscription: Subscription = null;

  messageList: ConversationMessageList = null;
  messages: ConversationMessage[] = [];
  messageLoadError: string = null;

  latestDate: string = null;
  latestLoaded: ConversationMessage = null;

  infinityScrollDisabled: boolean = true;

  constructor(
    private store: Store<State>,
    private conversationService: UserConversationService,
    private messageService: ConversationMessageService,
  ) { }

  async ngOnInit() {

    this.store.dispatch(new ConversationClose());

    this.resetLastMessageActions();

    try {
      this.messageList = await this.conversationService.getIndividual(this.addressee).toPromise();
    }
    catch (error)
    {}

    if (!!this.messageList)
    {
      this.store.dispatch(new ConversationOpen(this.messageList));
    }

    await this.scrollDownList();
    await this.loadMessages();
    await this.readLastMessages();

    this.initReceivedMessageHandler();
    this.initRemovedMessageHandler();
    this.initEditedMessageHandler();

  }

  ngOnDestroy(): void {

    this.disposeReceivedMessageHandler();
    this.disposeRemovedMessageHandler();
    this.disposeEditedMessageHandler();
  }

  initReceivedMessageHandler()
  {
    this.receivedMessageSubscription = this.store.pipe(
      select(state => state.client.lastReceivedMessage),
      filter(message => !!message)
    ).subscribe(async (message: ReceivedMessage) => {

      const { messageList } = message;
      if (
        // @ts-ignore
        messageList.isMember(this.addressee)
        // @ts-ignore
        && messageList.isMember(this.authorizedUser)
        && !this.messageList
      )
      {
        this.messageList = messageList;
      }

      if (this.messageList.id === message.messageList.id)
      {
        this.messages.unshift(message.message);
      }

      const wasScrollDisabled: boolean = this.infinityScrollDisabled;

      this.infinityScrollDisabled = true;
      await this.scrollDownList();
      this.infinityScrollDisabled = wasScrollDisabled;

      await this.readLastMessages();

      this.messageReceivedEmitter.emit(message.message);
    });
  }

  disposeReceivedMessageHandler()
  {
    if (!!this.receivedMessageSubscription)
    {
      this.receivedMessageSubscription.unsubscribe();
      this.receivedMessageSubscription = null;
    }
  }

  initRemovedMessageHandler()
  {
    this.removedMessageSubscription = this.store.pipe(
      select(state => state.client.lastRemovedMessage),
      filter(message => !!message)
    )
      .subscribe((message: RemovedMessage) => {

        if (!this.messageList)
        {
          return;
        }

        if (this.messageList.id === message.messageList.id)
        {
          const index = this.messages.findIndex(item => item.message.id === message.message);
          if (index !== -1)
          {
            this.messages.splice(index, 1);
          }
        }

      });
  }

  disposeRemovedMessageHandler()
  {
    if (!!this.removedMessageSubscription)
    {
      this.removedMessageSubscription.unsubscribe();
      this.removedMessageSubscription = null;
    }
  }

  initEditedMessageHandler()
  {
    this.editedMessageSubscription = this.store.pipe(
      select(state => state.client.lastEditedMessage),
      filter(message => !!message)
    ).subscribe((message: EditedMessage) => {

      if (!this.messageList)
      {
        return;
      }

      if (this.messageList.id === message.messageList)
      {
        const index = this.messages.findIndex(item => item.id === message.id);
        if (index !== -1)
        {
          const editedMessage: ConversationMessage = this.messages[index];

          this.messages[index] = message.editMessage(editedMessage);
        }
      }
    });
  }

  disposeEditedMessageHandler()
  {
    if (!!this.editedMessageSubscription)
    {
      this.editedMessageSubscription.unsubscribe();
      this.editedMessageSubscription = null;
    }
  }


  resetLastMessageActions()
  {
    this.store.dispatch(new MessageActionStateReset());
  }

  async loadMessages()
  {
    if (!this.messageList)
    {
      return;
    }

    this.infinityScrollDisabled = true;

    try {
      let messages = await this
        .messageService
        .getList(this.messageList, this.latestDate, this.latestLoaded)
        .toPromise();

      messages = this.filterReceived(messages);

      if (messages.length > 0)
      {
        this.latestLoaded = messages[messages.length - 1];
        // @ts-ignore
        this.latestDate = this.latestLoaded.message.createdAt;

        this.messages = this.messages.concat(messages);

        this.infinityScrollDisabled = false;
      }

    }
    catch (error)
    {
      this.messageLoadError = 'This conversation is not available';
    }

  }

  filterReceived(newMessages: ConversationMessage[])
  {
    const result: ConversationMessage[] = [];

    for (let newMessage of newMessages)
    {
      const index = this.messages.findIndex(item => item.id === newMessage.id);
      if (index === -1)
      {
        result.push(newMessage);
      }
    }

    return result;
  }

  async readLastMessages()
  {
    if (!!this.messageList)
    {
      await this.messageService.readLastMessage(this.messageList).toPromise();
    }
  }

  async onSendHandler(text: string)
  {
    try {
      if (this.messageList === null)
      {

        const result = await this.messageService.sendToUser(this.addressee, text).toPromise();

        this.messageList = result.conversation;
      }
      else
      {
        // send to the conversation
        await this.messageService.sendToConversation(this.messageList, text).toPromise();
      }

    }
    catch (error)
    {
      this.store.dispatch(new GlobalNotification(new Notification(NotificationType.ERROR, 'Cannot send message. Try it later...', 'Error')));
    }
  }

  scrollDownList()
  {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { nativeElement } = this.messageListContainer;

        nativeElement.scrollTop = 0;

        resolve(null);
      }, 10);
    });
  }

  async onScroll()
  {
    await this.loadMessages();
  }

  onCloseClickHandler(event)
  {
    this.closeEmitter.emit();
  }

}
