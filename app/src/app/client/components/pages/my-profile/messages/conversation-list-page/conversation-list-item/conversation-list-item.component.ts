import {Component, Input, OnInit} from '@angular/core';
import {ConversationMessageList} from "../../../../../../../core/data/models/messages/conversation-message-list.model";

@Component({
  selector: 'app-conversation-list-item',
  templateUrl: './conversation-list-item.component.html',
  styleUrls: ['./conversation-list-item.component.css']
})
export class ConversationListItemComponent implements OnInit {

  @Input() conversation: ConversationMessageList;

  constructor() { }

  ngOnInit(): void {
  }

}
