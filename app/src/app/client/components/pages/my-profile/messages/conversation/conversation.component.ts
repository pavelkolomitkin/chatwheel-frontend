import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../../app.state";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {User} from "../../../../../../security/data/models/user.model";
import {filter, first} from "rxjs/operators";
import {UserProfileService} from "../../../../../services/user-profile.service";
import {UserConversationService} from "../../../../../services/user-conversation.service";
import {ConversationMessageList} from "../../../../../../core/data/models/messages/conversation-message-list.model";
import {ConversationMessageService} from "../../../../../services/conversation-message.service";
import {ConversationMessage} from "../../../../../../core/data/models/messages/conversation-message.model";
import {GlobalNotification} from "../../../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../../../core/data/models/notification.model";
import {PAGE_NOT_FOUND_ROUTE} from "../../../../../client-routing.module";
import {UserReportAbuseInit} from "../../../../../data/actions";
import {ReceivedMessage} from "../../../../../data/model/messages/received-message.model";
import {RemovedMessage} from "../../../../../data/model/messages/removed-message.model";
import {EditedMessage} from "../../../../../data/model/messages/edited-message.model";
import {UserActivitySocketService} from "../../../../../services/sockets/user-activity-socket.service";
import {UserTyping} from "../../../../../data/model/user-activity/user-typing.model";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit, OnDestroy {

  @ViewChild('messageListContainer') messageListContainer: ElementRef;

  paramSubscription: Subscription = null;
  bannedUserSubscription: Subscription = null;
  receivedMessageSubscription: Subscription = null;
  removedMessageSubscription: Subscription = null;
  editedMessageSubscription: Subscription = null;
  userActivitySubscription: Subscription = null;

  user: User = null;
  addressee: User = null;

  messageList: ConversationMessageList = null;
  messages: ConversationMessage[] = [];

  latestDate: string = null;
  latestLoaded: ConversationMessage = null;

  isInitialized: boolean = false;
  isLoading: boolean = false;
  infinityScrollDisabled: boolean = true;

  userTyping: UserTyping = null;

  constructor(
    private store: Store<State>,
    private router: Router,
    private route: ActivatedRoute,
    private userProfileService: UserProfileService,
    private conversationService: UserConversationService,
    private messageService: ConversationMessageService,
    private userActivitySocket: UserActivitySocketService
  ) { }

  async ngOnInit() {

    this.user = await this.store.pipe(select(state => state.security.user), first()).toPromise();

    this.paramSubscription = this.route.params.subscribe( async (params) => {

      this.disposeBanUserSubscription();
      this.disposeReceivedMessageHandler();
      this.disposeRemovedMessageHandler();
      this.disposeEditedMessageHandler();
      this.disposeTypingHandler();

      this.isInitialized = false;

      if (typeof params['addresseeId'] !== 'undefined')
      {
        const addresseeId = params['addresseeId'];

        try {
          this.addressee = await this.userProfileService.get(addresseeId).toPromise();
        }
        catch (error)
        {
          await this.router.navigateByUrl(PAGE_NOT_FOUND_ROUTE);
          return;
        }

        try {
          this.messageList = await this.conversationService.getIndividual(this.addressee).toPromise();
        }
        catch (error) { }

      }
      else if (typeof params['conversationId'] !== 'undefined')
      {
        try {
          this.messageList = await this.conversationService.get(params['conversationId']).toPromise();

          const addresseeItem = this.messageList.members.find(item => item.member.id !== this.user.id);
          this.addressee = addresseeItem.member;
        }
        catch (error)
        {
          await this.router.navigateByUrl(PAGE_NOT_FOUND_ROUTE);
          return;
        }
      }

      await this.scrollDownList();
      await this.loadMessages();
      await this.readLastMessages();

      this.initBanUserSubscription();
      this.initReceivedMessageHandler();
      this.initRemovedMessageHandler();
      this.initEditedMessageHandler();
      this.initTypingHandler();

      this.isInitialized = true;
    });

  }

  initTypingHandler()
  {
    this.userActivitySubscription = this.userActivitySocket.getUserTyping().subscribe(
      (data: UserTyping) => {

        if (!this.messageList)
        {
          return;
        }

        if (this.messageList.id === data.messageList)
        {
          this.userTyping = data;
        }
      }
    );
  }

  disposeTypingHandler()
  {
    if (!!this.userActivitySubscription)
    {
      this.userActivitySubscription.unsubscribe();
      this.userActivitySubscription = null;
    }
  }

  initReceivedMessageHandler()
  {
    this.receivedMessageSubscription = this.store.pipe(
      select(state => state.client.lastReceivedMessage),
      filter(message => !!message)
    ).subscribe((message: ReceivedMessage) => {

      if (!this.messageList)
      {
        return;
      }

      if (this.messageList.id === message.messageList.id)
      {
        if (this.user.id !== message.message.message.author.id)
        {
          this.messages.unshift(message.message);
        }
      }
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

          message.editMessage(editedMessage);

          this.messages[index] = editedMessage;
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

  initBanUserSubscription()
  {
    this.bannedUserSubscription = this.store.pipe(
      select(state => state.client.lastBanStatusChangedUser),
      filter(user => !!user)
    ).subscribe(
      (user: User) => {
        if (user.id === this.addressee.id)
        {
          this.addressee = user;
        }
      }
    );
  }

  disposeBanUserSubscription()
  {
    if (!!this.bannedUserSubscription)
    {
      this.bannedUserSubscription.unsubscribe();
      this.bannedUserSubscription = null;
    }
  }

  async loadMessages()
  {
    if (!this.messageList)
    {
      return;
    }

    this.infinityScrollDisabled = true;
    this.isLoading = true;

    try {
      let messages = await this.messageService.getList(this.messageList, this.latestDate, this.latestLoaded).toPromise();
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
    catch (error) {
      this.store.dispatch(new GlobalNotification(
        new Notification(NotificationType.ERROR, 'The conversation is not available!', 'Error'))
      );

      await this.router.navigateByUrl('/client/profile/me');
    }

    this.isLoading = false;
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

  ngOnDestroy(): void {

    if (this.paramSubscription !== null)
    {
      this.paramSubscription.unsubscribe();
      this.paramSubscription = null;
    }

    this.disposeBanUserSubscription();
  }

  async onMessageSubmitHandler(text: string)
  {
    //debugger
    if (this.messageList === null)
    {
      // send directly to the addressee
      const data = await this.messageService.sendToUser(this.addressee, text).toPromise();

      this.messages.push(data.message);
      this.messageList = data.conversation;
    }
    else
    {
      // send to the conversation
      try {
        const message = await this.messageService.sendToConversation(this.messageList, text).toPromise();
        //debugger;
        this.messages.unshift(message);
      }
      catch (error)
      {
        this.store.dispatch(new GlobalNotification(new Notification(NotificationType.ERROR, 'Cannot send message. Try it later...', 'Error')));
      }
    }

    const wasScrollDisabled: boolean = this.infinityScrollDisabled;

    this.infinityScrollDisabled = true;
    await this.scrollDownList();
    this.infinityScrollDisabled = wasScrollDisabled;
  }

  scrollDownList()
  {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { nativeElement } = this.messageListContainer;

        //nativeElement.scrollTop = nativeElement.scrollHeight;
        nativeElement.scrollTop = 0;

        resolve(null);
      }, 10);
    });
  }

  async onScroll()
  {
    await this.loadMessages();
  }

  onMessageRemovedHandler(message: ConversationMessage)
  {
    const index = this.messages.findIndex(item => item.id === message.id);
    if (index !== -1)
    {
      this.messages.splice(index, 1);
    }
  }

  onReportAbuseClickHandler(event)
  {
    this.store.dispatch(new UserReportAbuseInit(this.addressee));
  }
}