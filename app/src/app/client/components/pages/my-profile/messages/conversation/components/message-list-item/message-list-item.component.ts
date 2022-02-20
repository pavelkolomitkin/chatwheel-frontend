import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../../../../../security/data/models/user.model";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../../../../app.state";
import {first} from "rxjs/operators";
import {ConversationMessage} from "../../../../../../../../core/data/models/messages/conversation-message.model";

@Component({
  selector: 'app-message-list-item',
  templateUrl: './message-list-item.component.html',
  styleUrls: ['./message-list-item.component.css']
})
export class MessageListItemComponent implements OnInit {

  @Input() message: ConversationMessage;

  user: User;

  constructor(
    private store: Store<State>
  ) { }

  async ngOnInit() {
    this.user = await this.store.pipe(select(state => state.security.user), first()).toPromise();
  }

}
