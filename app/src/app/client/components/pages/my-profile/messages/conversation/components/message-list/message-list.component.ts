import {Component, Input, OnInit} from '@angular/core';
import {ConversationMessage} from "../../../../../../../../core/data/models/messages/conversation-message.model";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  @Input() list: ConversationMessage[] = null;

  @Input() isLoading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
