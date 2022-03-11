import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {UserConversationService} from "../../../../../services/user-conversation.service";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../../app.state";
import {ConversationMessageList} from "../../../../../../core/data/models/messages/conversation-message-list.model";
import {Router} from "@angular/router";
import {User} from "../../../../../../security/data/models/user.model";
import {filter, first} from "rxjs/operators";
import {ReceivedMessage} from "../../../../../data/model/messages/received-message.model";
import {Subscription} from "rxjs";
import {MessageActionStateReset, MessageReceivedReset} from "../../../../../data/actions";
import {EditedMessage} from "../../../../../data/model/messages/edited-message.model";
import {RemovedMessage} from "../../../../../data/model/messages/removed-message.model";

@Component({
  selector: 'app-conversation-list-page',
  templateUrl: './conversation-list-page.component.html',
  styleUrls: ['./conversation-list-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConversationListPageComponent implements OnInit, OnDestroy {

  list: ConversationMessageList[] = null;
  latest: ConversationMessageList = null;
  latestUpdatedAt: Date = null;

  isLoading: boolean = false;
  infiniteScrollDisabled: boolean = false;

  authorizedUser: User;

  receivedMessageSubscription: Subscription = null;
  editedMessageSubscription: Subscription = null;
  removedMessageSubscription: Subscription = null;


  constructor(
    private service: UserConversationService,
    private store: Store<State>,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.store.dispatch(new MessageActionStateReset());

    this.authorizedUser = await this.store.pipe(select(state => state.security.user), first()).toPromise();

    await this.loadList();

    this.receivedMessageSubscription = this.store.pipe(
      select(state => state.client.lastReceivedMessage),
      filter(message => !!message)
    ).subscribe(this.onMessageReceivedEventHandler);

    this.editedMessageSubscription = this.store.pipe(
      select(state => state.client.lastEditedMessage),
      filter(message => !!message)
    ).subscribe(this.onMessageEditedHandler);

    this.removedMessageSubscription = this.store.pipe(
      select(state => state.client.lastRemovedMessage),
      filter(message => !!message)
    ).subscribe(this.onMessageRemovedHandler);
  }

  ngOnDestroy(): void {

    this.receivedMessageSubscription.unsubscribe();

    if (!!this.editedMessageSubscription)
    {
      this.editedMessageSubscription.unsubscribe();
      this.editedMessageSubscription = null;
    }

    if (!!this.removedMessageSubscription)
    {
      this.removedMessageSubscription.unsubscribe();
      this.removedMessageSubscription = null;
    }
  }

  onMessageEditedHandler = (message: EditedMessage) => {

    const index = this.list.findIndex(item => item.id === message.messageList);
    if (index !== -1)
    {
      const conversation: ConversationMessageList = this.list[index];
      if (!!conversation.lastMessage && (conversation.lastMessage.id === message.id))
      {
        conversation.lastMessage = message.editMessage(conversation.lastMessage);
        this.list[index] = conversation;
      }
    }
  }

  onMessageRemovedHandler = (message: RemovedMessage) => {

    const index = this.list.findIndex(item => item.id === message.messageList.id);
    if (index !== -1)
    {
      const conversation: ConversationMessageList = this.list[index];
      conversation.newMessageNumber = message.messageList.newMessageNumber;

      if (!!conversation.lastMessage && (conversation.lastMessage.message.id === message.message))
      {
        conversation.lastMessage = null;
      }

      this.list[index] = conversation;
    }
  }

  async loadList()
  {
    this.infiniteScrollDisabled = true;

    this.isLoading = true;

    let list = await this.service.getList(this.latest, this.latestUpdatedAt).toPromise();
    if (!this.list)
    {
      this.list = [];
    }

    list = this.filterReceived(list);
    if (list.length > 0)
    {
      this.list = this.list.concat(list);
      this.latest = list[list.length - 1];
      // @ts-ignore
      this.latestUpdatedAt = this.latest.updatedAt;

      this.infiniteScrollDisabled = false;
    }

    this.isLoading = false;
  }

  onMessageReceivedEventHandler = (data: ReceivedMessage) => {

    const { messageList } = data;

    const index = this.list.findIndex(item => item.id === messageList.id);
    if (index !== -1)
    {
      this.list.splice(index, 1);
    }

    this.list.unshift(messageList);
  }

  filterReceived(lists: ConversationMessageList[])
  {
    const result: ConversationMessageList[] = [];

    for (let list of lists)
    {
      const index = this.list.findIndex(item => item.id === list.id);
      if (index === -1)
      {
        result.push(list);
      }
    }

    return result;
  }

  async onScroll()
  {
    await this.loadList();
  }


  async onConversationClickHandler(conversation: ConversationMessageList)
  {
    await this.router.navigateByUrl('/profile/me/messages/conversation/' + conversation.id);
  }

  onRemoveConversationHandler(conversation: ConversationMessageList)
  {
    const index = this.list.findIndex(item => item.id === conversation.id);
    if (index !== -1)
    {
      this.list.splice(index, 1);
    }
  }

}
