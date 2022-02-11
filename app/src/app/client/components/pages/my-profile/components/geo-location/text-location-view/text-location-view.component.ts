import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State as ClientState} from "../../../../../../data/reducer";
import {Observable} from "rxjs";
import {State} from "../../../../../../../app.state";
import {User} from "../../../../../../../security/data/models/user.model";
import {UserRequestUpdateGeoLocation} from "../../../../../../data/actions";

@Component({
  selector: 'app-my-text-location-view',
  templateUrl: './text-location-view.component.html',
  styleUrls: ['./text-location-view.component.css']
})
export class TextLocationViewComponent implements OnInit, OnDestroy {

  isGeolocationTurnedOn: Observable<boolean>;

  @Input() user: User;

  constructor(
    private clientStore: Store<ClientState>,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.isGeolocationTurnedOn = this.store.pipe(select(state => state.client.isGeolocationTurnedOn));
  }

  ngOnDestroy(): void {
  }


  onUpdateRequestLocationClickHandler(event)
  {
    this.store.dispatch(new UserRequestUpdateGeoLocation());
  }

}
