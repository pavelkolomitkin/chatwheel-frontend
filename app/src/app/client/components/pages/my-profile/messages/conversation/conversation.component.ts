import {Component, OnDestroy, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit, OnDestroy {


  paramSubscription: Subscription = null;

  user: User = null;
  addressee: User = null;

  messageList: ConversationMessageList = null;
  messages: ConversationMessage[] = [];

  isInitialized: boolean = false;

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
        // get the addressee profile info
        // if addressee doesn't exist
          // navigate to 404
        try {
          this.addressee = await this.userProfileService.get(addresseeId).toPromise();
        }
        catch (error)
        {
          await this.router.navigateByUrl('404');
          return;
        }

        // get a ConversationMessageList of an individual conversation with the addressee if it exists

        try {
          this.messageList = await this.conversationService.getIndividual(this.addressee).toPromise();
          //debugger
        }
        catch (error) { }

        // if it does exist
          // load last messages from the list
        if (!!this.messageList)
        {
          try {
            this.messages = await this.messageService.getList(this.messageList).toPromise();
          }
          catch (error) { }

        }

        // get the page initialized
        this.isInitialized = true;
      }
      else if (typeof params['conversationId'] !== 'undefined')
      {
        // get the ConversationMessageList by conversationId
          // it should contain information about the addressee as well(in general, about all members a group conversation)

        try {
          const conversationData = await this.conversationService.get(params['conversationId']).toPromise();
          debugger

          this.messageList = conversationData.messageList;
          this.addressee = conversationData.members.find(item => item.id !== this.user.id);

          debugger;

        }
        catch (error)
        {
          await this.router.navigateByUrl('404');
          return;
        }

        // if it doesn't exist
          // navigate to 404

        // load last messages from the conversation list
        if (!!this.messageList)
        {
          try {
            const messages = await this.messageService.getList(this.messageList).toPromise();
            //debugger
          }
          catch (error) { }

        }

        // get the page initialized
        this.isInitialized = true;


        // get the page initialized
      }
    });

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
    debugger
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
        debugger;
      }
      catch (error)
      {
        debugger;
      }
    }

  }
}
