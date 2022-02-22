import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {Observable} from "rxjs";
import {User} from "../../../security/data/models/user.model";
import {UserLogout} from "../../../security/data/actions";

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  user: Observable<User>;
  newMessageNumber: Observable<Number>;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.user = this.store.pipe(select(state => state.security.user));
    this.newMessageNumber = this.store.pipe(select(state => state.client.newMessageNumber));
  }

  onLogoutClickHandler(event)
  {
    this.store.dispatch(new UserLogout());
  }
}
