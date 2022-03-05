import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../app.state";
import {Observable} from "rxjs";
import {User} from "../../../../../security/data/models/user.model";
import {UserRequestUpdateGeoLocation} from "../../../../data/actions";

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NearbyComponent implements OnInit, OnDestroy {

  user: Observable<User>;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {

    this.user = this.store.pipe(select(state => state.security.user));

  }

  ngOnDestroy(): void {
  }


  onLocationUpdateClickHandler(event)
  {
    this.store.dispatch(new UserRequestUpdateGeoLocation());
  }

}
