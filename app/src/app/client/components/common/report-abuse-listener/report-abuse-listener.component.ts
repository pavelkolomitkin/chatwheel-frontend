import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {User} from "../../../../security/data/models/user.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-report-abuse-listener',
  templateUrl: './report-abuse-listener.component.html',
  styleUrls: ['./report-abuse-listener.component.css'],
})
export class ReportAbuseListenerComponent implements OnInit, OnDestroy {

  user: Observable<User>;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {

    this.user = this.store.pipe(select(state => state.client.abuseReportRecipient));
  }

  ngOnDestroy(): void {

  }

}
