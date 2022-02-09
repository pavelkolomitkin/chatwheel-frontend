import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../../../../security/data/models/user.model";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../app.state";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Observable<User>;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.user = this.store.pipe(select(state => state.security.user));
  }

}
