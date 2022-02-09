import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {Observable} from "rxjs";
import {User} from "../../../security/data/models/user.model";

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  user: Observable<User>

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.user = this.store.pipe(select(state => state.security.user))
  }

}
