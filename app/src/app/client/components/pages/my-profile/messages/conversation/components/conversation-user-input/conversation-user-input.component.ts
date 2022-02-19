import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-conversation-user-input',
  templateUrl: './conversation-user-input.component.html',
  styleUrls: ['./conversation-user-input.component.css']
})
export class ConversationUserInputComponent implements OnInit {

  inputText: string = '';

  @Input() isEnabled: boolean;

  @Output('onSubmit') submitEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

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

}
