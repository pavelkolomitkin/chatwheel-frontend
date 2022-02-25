import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../../../../security/data/models/user.model";
import {Store} from "@ngrx/store";
import {State} from "../../../../../../../app.state";
import {UserRequestUpdateGeoLocation} from "../../../../../../data/actions";

@Component({
  selector: 'app-edit-map-location',
  templateUrl: './edit-map-location.component.html',
  styleUrls: ['./edit-map-location.component.css']
})
export class EditMapLocationComponent implements OnInit {

  @Input() user: User

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
  }

  onUpdateClickHandler(event)
  {
    this.store.dispatch(new UserRequestUpdateGeoLocation());
  }

}
