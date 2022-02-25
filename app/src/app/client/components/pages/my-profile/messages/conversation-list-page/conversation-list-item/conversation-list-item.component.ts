import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ConversationMessageList} from "../../../../../../../core/data/models/messages/conversation-message-list.model";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../../../app.state";
import {User} from "../../../../../../../security/data/models/user.model";
import {filter, first} from "rxjs/operators";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserConversationService} from "../../../../../../services/user-conversation.service";
import {GlobalNotification} from "../../../../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../../../../core/data/models/notification.model";
import {UserActivitySocketService} from "../../../../../../services/sockets/user-activity-socket.service";
import {Subscription} from "rxjs";
import {UserTyping} from "../../../../../../data/model/user-activity/user-typing.model";
import {ConversationMessage} from "../../../../../../../core/data/models/messages/conversation-message.model";
import {ReceivedMessage} from "../../../../../../data/model/messages/received-message.model";
import {EditedMessage} from "../../../../../../data/model/messages/edited-message.model";
import {RemovedMessage} from "../../../../../../data/model/messages/removed-message.model";

@Component({
  selector: '[app-conversation-list-item]',
  templateUrl: './conversation-list-item.component.html',
  styleUrls: ['./conversation-list-item.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationListItemComponent implements OnInit, OnDestroy {

  @ViewChild('confirmationWindow') window: TemplateRef<any>;

  @Output('onRemoved') removedEmitter: EventEmitter<ConversationMessageList> = new EventEmitter<ConversationMessageList>();

  @Input() user: User = null;

  _conversation: ConversationMessageList;

  addressee: User;

  isAlertShown: boolean = false;

  typing: UserTyping = null;

  isTypingVisible: boolean = false;

  userTypingSubscription: Subscription = null;


  @Input() set conversation(conversation: ConversationMessageList)
  {
    this._conversation = conversation;
  }

  constructor(
    private store:Store<State>,
    private modal: NgbModal,
    private changeDetector: ChangeDetectorRef,
    private conversationService: UserConversationService,
    private userActivitySocket: UserActivitySocketService,
  ) { }

  async ngOnInit() {

    const member = this._conversation.members.find(item => item.member.id !== this.user.id);
    if (!!member)
    {
      this.addressee = member.member;
    }
    else
    {
      this.addressee = null;
    }
    this.userTypingSubscription = this.userActivitySocket.getUserTyping().subscribe(this.onUserTypingEventHandler);

    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {

    if (!!this.userTypingSubscription)
    {
      this.userTypingSubscription.unsubscribe();
      this.userTypingSubscription = null;
    }
  }

  onUserTypingEventHandler = (data: UserTyping) =>
  {
    if (!!this.addressee && (this.addressee.id === data.user.id))
    {
      this.typing = data;
      this.changeDetector.detectChanges();
    }
  }

  onTypingVisibilityChangeHandler(isVisible: boolean)
  {
    this.isTypingVisible = isVisible;
  }

  onDeleteClickHandler(event)
  {
    event.stopPropagation();

    this.isAlertShown = true;
    this.changeDetector.detectChanges();
  }

  async onConversationDeleteHandler(event)
  {
    try {
      await this.conversationService.remove(this._conversation).toPromise();
      this.removedEmitter.emit(this._conversation);
    }
    catch (error)
    {
      this.store.dispatch(new GlobalNotification(new Notification(
        NotificationType.ERROR, 'Cannot delete the conversation', 'Error'
      )));
    }

  }

}
