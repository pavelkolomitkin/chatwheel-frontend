import {Component, Input, OnInit} from '@angular/core';
import {Call} from "../../../../../data/model/calls/call.model";
import {CallMember} from "../../../../../data/model/calls/call-member.model";
import {User} from "../../../../../../security/data/models/user.model";
import {Store} from "@ngrx/store";
import {State} from "../../../../../../app.state";
import {UserReportAbuseInit} from "../../../../../data/actions";
import {UserInitiateDirectCall} from "../../../../../data/calls/actions";

@Component({
  selector: '[app-call-list-item]',
  templateUrl: './call-list-item.component.html',
  styleUrls: ['./call-list-item.component.css']
})
export class CallListItemComponent implements OnInit {

  @Input() user: User;

  _call: Call

  _caller: CallMember;
  _addressee: CallMember;

  @Input() set call(value: Call)
  {
    this._call = value;
    if (!this._call)
    {
      return;
    }

    if (this._call.isDirect)
    {
      this._caller = this._call.members.find(member => member.isInitiator === true);
      this._addressee = this._call.members.find(member => member.isInitiator !== true);
    }
    else
    {
      this._addressee = this._call.members.find(member => member.user.id !== this.user.id);
    }
  }

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
  }


  onCallClickHandler(event)
  {
    this.store.dispatch(new UserInitiateDirectCall(this._addressee.user));
  }

  onReportAbuseClickHandler(event)
  {
    this.store.dispatch(new UserReportAbuseInit(this._addressee.user));
  }

}
