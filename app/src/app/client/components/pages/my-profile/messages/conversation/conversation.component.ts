import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../../app.state";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {User} from "../../../../../../security/data/models/user.model";
import {first} from "rxjs/operators";
import {UserProfileService} from "../../../../../services/user-profile.service";
import {UserConversationService} from "../../../../../services/user-conversation.service";
import {ConversationMessageList} from "../../../../../../core/data/models/messages/conversation-message-list.model";
import {ConversationMessageService} from "../../../../../services/conversation-message.service";
import {ConversationMessage} from "../../../../../../core/data/models/messages/conversation-message.model";
import {GlobalNotification} from "../../../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../../../core/data/models/notification.model";
import {Message} from "../../../../../../core/data/models/messages/message.model";
import {PAGE_NOT_FOUND_ROUTE} from "../../../../../client-routing.module";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit, OnDestroy {

  @ViewChild('messageListContainer') messageListContainer: ElementRef;

  paramSubscription: Subscription = null;

  user: User = null;
  addressee: User = null;

  messageList: ConversationMessageList = null;
  messages: ConversationMessage[] = [];

  latestDate: string = null;
  latestLoaded: ConversationMessage = null;

  isInitialized: boolean = false;
  isLoading: boolean = false;
  infinityScrollDisabled: boolean = true;

  constructor(
    private store: Store<State>,
    private router: Router,
    private route: ActivatedRoute,
    private userProfileService: UserProfileService,
    private conversationService: UserConversationService,
    private messageService: ConversationMessageService
  ) { }

  async ngOnInit() {

    this.user = await this.store.pipe(select(state => state.security.user), first()).toPromise();

    this.paramSubscription = this.route.params.subscribe( async (params) => {

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

      this.isInitialized = true;
    });

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
      const messages = await this.messageService.getList(this.messageList, this.latestDate, this.latestLoaded).toPromise();

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

  ngOnDestroy(): void {

    if (this.paramSubscription !== null)
    {
      this.paramSubscription.unsubscribe();
      this.paramSubscription = null;
    }
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
    //debugger
    console.log('SCROLL...');

    const { nativeElement } = this.messageListContainer;
    console.log('nativeElement.scrollTop: ' + nativeElement.scrollTop.toString());
    console.log('nativeElement.scrollHeight: ' + nativeElement.scrollHeight.toString());

    await this.loadMessages();
  }
}
