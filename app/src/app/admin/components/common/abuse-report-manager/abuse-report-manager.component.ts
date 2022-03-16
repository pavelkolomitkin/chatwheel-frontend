import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {AbuseReport} from "../../../../core/data/models/abuse-report.model";
import {Subscription} from "rxjs";
import {AbuseReportOpen, AbuseReportRead} from "../../../data/actions";

@Component({
  selector: 'app-abuse-report-manager',
  templateUrl: './abuse-report-manager.component.html',
  styleUrls: ['./abuse-report-manager.component.css']
})
export class AbuseReportManagerComponent implements OnInit, OnDestroy {

  report: AbuseReport = null;
  isAbuseReportWindowShown:boolean = false;

  lastAbuseReportOpenSubscription: Subscription;


  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {

    this.lastAbuseReportOpenSubscription = this
      .store
      .pipe(select(state => state.admin.lastOpenedAbuseReport))
      .subscribe(this.onLastAbuseReportOpenHandler)

  }

  ngOnDestroy(): void {

    this.lastAbuseReportOpenSubscription.unsubscribe();

  }

  onLastAbuseReportOpenHandler = (report: AbuseReport) => {

    this.report = report;
    this.isAbuseReportWindowShown = !!this.report;

  }

  onAbuseReportWindowCloseHandler(event)
  {
    this.store.dispatch(new AbuseReportOpen(null));
  }

  onAbuseReportWindowOpenHandler(event)
  {
    if (this.report.new)
    {
      this.store.dispatch(new AbuseReportRead(this.report));
    }
  }
}
