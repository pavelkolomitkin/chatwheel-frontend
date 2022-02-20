import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ConversationMessageList} from "../../../../../../../core/data/models/messages/conversation-message-list.model";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../../../app.state";
import {User} from "../../../../../../../security/data/models/user.model";
import {first} from "rxjs/operators";

@Component({
  selector: '[app-conversation-list-item]',
  templateUrl: './conversation-list-item.component.html',
  styleUrls: ['./conversation-list-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConversationListItemComponent implements OnInit {

  user: User = null;

  _conversation: ConversationMessageList;

  addressee: User;

  @Input() set conversation(conversation: ConversationMessageList)
  {
    this._conversation = conversation;
  }

  constructor(
    private store:Store<State>
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
  }

  onDeleteClickHandler(event)
  {
    event.stopPropagation();
  }

}
