import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserActivitySocketService} from "../../../../../../../services/sockets/user-activity-socket.service";
import {
  ConversationMessageList
} from "../../../../../../../../core/data/models/messages/conversation-message-list.model";

@Component({
  selector: 'app-conversation-user-input',
  templateUrl: './conversation-user-input.component.html',
  styleUrls: ['./conversation-user-input.component.css']
})
export class ConversationUserInputComponent implements OnInit {

  inputText: string = '';

  @Input() isEnabled: boolean;

  @Input() messageList: ConversationMessageList;

  @Output('onSubmit') submitEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private userActivitySocket: UserActivitySocketService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm)
  {
    let { inputText } = form.value;
    inputText = inputText.trim();

    if (inputText !== '')
    {
      this.submitEmitter.emit(inputText);
      this.inputText = '';
    }
  }

  onTextChangeHandler(event)
  {
    if (!!this.messageList)
    {
      this.userActivitySocket.sendTyping(this.messageList);
    }
  }
}
