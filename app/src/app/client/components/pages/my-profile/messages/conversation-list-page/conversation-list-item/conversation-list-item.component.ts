import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
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
import {first} from "rxjs/operators";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserConversationService} from "../../../../../../services/user-conversation.service";
import {GlobalNotification} from "../../../../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../../../../core/data/models/notification.model";

@Component({
  selector: '[app-conversation-list-item]',
  templateUrl: './conversation-list-item.component.html',
  styleUrls: ['./conversation-list-item.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationListItemComponent implements OnInit {

  @ViewChild('confirmationWindow') window: TemplateRef<any>;

  @Output('onRemoved') removedEmitter: EventEmitter<ConversationMessageList> = new EventEmitter<ConversationMessageList>();

  user: User = null;

  _conversation: ConversationMessageList;

  addressee: User;

  isAlertShown: boolean = false;

  @Input() set conversation(conversation: ConversationMessageList)
  {
    this._conversation = conversation;
  }

  constructor(
    private store:Store<State>,
    private modal: NgbModal,
    private changeDetector: ChangeDetectorRef,
    private conversationService: UserConversationService
  ) { }

  async ngOnInit() {
    this.user = await this.store.pipe(select(state => state.security.user), first()).toPromise();

    const member = this._conversation.members.find(item => item.member.id !== this.user.id);
    if (!!member)
    {
      this.addressee = member.member;
    }
    else
    {
      this.addressee = null;
    }

    this.changeDetector.detectChanges();
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
