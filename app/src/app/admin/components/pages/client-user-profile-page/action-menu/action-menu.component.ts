import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../../security/data/models/user.model";
import {Store} from "@ngrx/store";
import {State} from "../../../../../app.state";
import {BlockUserInit, DeleteUserInit, UnBlockUserInit} from "../../../../data/actions";

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.css']
})
export class ActionMenuComponent implements OnInit {

  @Input() user: User;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
  }

  onUserBlockClickHandler(event)
  {
    this.store.dispatch(new BlockUserInit(this.user));
  }

  onUserUnBlockClickHandler(event)
  {
    this.store.dispatch(new UnBlockUserInit(this.user));
  }

  onUserDeleteClickHandler(event)
  {
    this.store.dispatch(new DeleteUserInit(this.user));
  }

}
