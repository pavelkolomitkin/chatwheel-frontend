import {Component, Input, OnInit} from '@angular/core';
import {ConversationMessageList} from "../../../../../../../core/data/models/messages/conversation-message-list.model";
import {User} from "../../../../../../../security/data/models/user.model";

@Component({
  selector: 'app-conversation-last-message',
  templateUrl: './conversation-last-message.component.html',
  styleUrls: ['./conversation-last-message.component.css']
})
export class ConversationLastMessageComponent implements OnInit {

  @Input() user: User;

  @Input() conversation: ConversationMessageList;

  constructor() { }

  ngOnInit(): void {
  }

}
