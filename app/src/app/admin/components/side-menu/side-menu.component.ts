import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  totalUserNumber: Observable<number>;

  totalAdminNumber: Observable<number>;

  newAbuseReportNumber: Observable<number>;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {

    this.totalUserNumber = this.store.pipe(select(state => state.admin.clientUserTotalNumber));

    this.totalAdminNumber = this.store.pipe(select(state => state.admin.adminTotalNumber));

    this.newAbuseReportNumber = this.store.pipe(select(state => state.admin.newAbuseReportNumber));


  }

}