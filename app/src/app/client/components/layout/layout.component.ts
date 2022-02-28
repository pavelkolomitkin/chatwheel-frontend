import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {
  MessageActionStateReset,
  UserRequestUpdateGeoLocation,
  UserUpdateNewMessageNumberStart
} from "../../data/actions";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new UserRequestUpdateGeoLocation());
    this.store.dispatch(new UserUpdateNewMessageNumberStart());
    this.store.dispatch(new MessageActionStateReset());
  }

  ngOnDestroy(): void {
    debugger
  }

}
