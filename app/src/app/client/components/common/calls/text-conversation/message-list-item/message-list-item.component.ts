import {Component, Input, OnInit} from '@angular/core';
import {ConversationMessage} from "../../../../../../core/data/models/messages/conversation-message.model";
import {User} from "../../../../../../security/data/models/user.model";

@Component({
  selector: 'app-call-window-message-list-item',
  templateUrl: './message-list-item.component.html',
  styleUrls: ['./message-list-item.component.css']
})
export class MessageListItemComponent implements OnInit {

  @Input() message: ConversationMessage;

  @Input() user: User;

  constructor() { }

  ngOnInit(): void {
  }
}
