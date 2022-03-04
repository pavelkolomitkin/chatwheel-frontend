import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {

  @Output('onSend') sendEmitter: EventEmitter<string> = new EventEmitter<string>();

  text: string = '';

  constructor() { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm)
  {
    const text: string = this.text.trim();
    if (text !== '')
    {
      this.sendEmitter.emit(text);
      this.text = '';
    }
  }

}
