import { Component, OnInit } from '@angular/core';
import {User} from "../../../../security/data/models/user.model";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {Observable} from "rxjs";

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

  async ngOnInit() {

    this.user = this.store.pipe(select(state => state.security.user));

  }

}
