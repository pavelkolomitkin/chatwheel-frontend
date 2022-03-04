import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Call} from "../../../../data/model/calls/call.model";
import {User} from "../../../../../security/data/models/user.model";

@Component({
  selector: 'app-incoming-direct-call-toast',
  templateUrl: './incoming-direct-call-toast.component.html',
  styleUrls: ['./incoming-direct-call-toast.component.css']
})
export class IncomingDirectCallToastComponent implements OnInit {

  @Output('onAccept') acceptEmitter: EventEmitter<Call> = new EventEmitter<Call>();
  @Output('onReject') rejectEmitter: EventEmitter<Call> = new EventEmitter<Call>();

  _call: Call = null;

  addressee: User;

  @Input() set call (value: Call)
  {
    this.addressee = null;

    this._call = value;

    if (this._call.members.length > 0)
    {
      this.addressee = this._call.members[0].user;
    }

  }

  constructor() { }

  ngOnInit(): void {
  }


  onAcceptClickHandler(event)
  {
    event.stopPropagation();
    this.acceptEmitter.emit(this._call);
  }

  onRejectClickHandler(event)
  {
    event.stopPropagation();
    this.rejectEmitter.emit(this._call);
  }

}
