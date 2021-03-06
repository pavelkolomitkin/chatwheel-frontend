import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {GetAbuseReportNumbers, GetAbuseReportTypesStart, GetClientUserNumber} from '../../data/actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {

    this.store.dispatch(new GetAbuseReportTypesStart());
    this.store.dispatch(new GetClientUserNumber());
    this.store.dispatch(new GetAbuseReportNumbers());
  }

}
