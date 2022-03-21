import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {GetAbuseReportNumbers, GetClientUserNumber} from "../../../data/actions";
import {map, mergeMap} from "rxjs/operators";
import {ClientUserStatisticsService} from "../../../services/statistics/client-user-statistics.service";
import {AbuseReportStatisticsService} from "../../../services/statistics/abuse-report-statistics.service";
import {AbuseReportTypeStatistic} from "../../../data/model/statistics/abuse-report-type-statistic.model";
import {CallStatisticsService} from "../../../services/statistics/call-statistics.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalUserNumber: Observable<number>;

  emailUserNumber: Observable<number>;
  emailUserNumberPercentage: Observable<string>;

  vkUserNumber: Observable<number>;
  vkUserNumberPercentage: Observable<string>;

  dynamicStartMonth: Date;
  dynamicEndMonth: Date;


  abuseReportTotalNumber: Observable<number>;
  abuseReportNewNumber: Observable<number>;
  abuseReportTypeNumbers: AbuseReportTypeStatistic[] = null;

  totalCallNumber: number = null;
  totalChatWheelCallNumber: number = null;
  totalDirectCallNumber: number = null;

  constructor(
    private store: Store<State>,
    private userStatistic: ClientUserStatisticsService,
    private abuseReportStatistics: AbuseReportStatisticsService,
    private callStatistics: CallStatisticsService
  ) { }

  async ngOnInit() {

    this.abuseReportTotalNumber = this.store.pipe(select(state => state.admin.totalAbuseReportNumber));
    this.abuseReportNewNumber = this.store.pipe(select(state => state.admin.newAbuseReportNumber));


    this.getDynamicDates();
    const userStatistics = this.getUserDynamics();
    const abuseReportStatistics = this.getAbuseReportStatistics();
    const callStatistics = this.getCallStatistics();

    await userStatistics;
    await abuseReportStatistics;
    await callStatistics;
  }

  async getCallStatistics()
  {
    const { total, chatWheelNumber, directCallNumber } = await this.callStatistics.getNumbers().toPromise();

    this.totalCallNumber = total;
    this.totalChatWheelCallNumber = chatWheelNumber;
    this.totalDirectCallNumber = directCallNumber;
  }

  async getAbuseReportStatistics()
  {
    this.store.dispatch(new GetAbuseReportNumbers());

    this.abuseReportTypeNumbers = await this.abuseReportStatistics.getTypeNumbers().toPromise();
  }

  getDynamicDates()
  {
    this.dynamicEndMonth = new Date();

    this.dynamicStartMonth = new Date();
    this.dynamicStartMonth.setMonth(this.dynamicStartMonth.getMonth() - 5);
  }

  async getUserDynamics()
  {
    this.store.dispatch(new GetClientUserNumber());

    this.getTotalUserNumbers();
  }

  getTotalUserNumbers()
  {
    this.totalUserNumber = this.store.pipe(select(state => state.admin.totalClientUserNumber));

    this.emailUserNumber = this.store.pipe(select(state => state.admin.emailClientUserNumber));
    this.emailUserNumberPercentage = this.emailUserNumber.pipe(
      mergeMap(emailNumber => {
        return this.totalUserNumber.pipe(
          map(total => this.getUserPercentages(total, emailNumber))
        )
      })
    )

    this.vkUserNumber = this.store.pipe(select(state => state.admin.vkUserNumber));
    this.vkUserNumberPercentage = this.vkUserNumber.pipe(
      mergeMap(vkNumber => {
        return this.totalUserNumber.pipe(
          map(total => this.getUserPercentages(total, vkNumber))
        )
      })
    );
  }

  getUserPercentages(total: number, value: number)
  {
    let result: string = null;
    if (!!total)
    {
      const emailPercentage: number = Math.round((value / total) * 100);

      if (emailPercentage < 1)
      {
        result = '< 1%';
      }
      else
      {
        result = '~' + emailPercentage.toFixed(2) + '%';
      }
    }

    return result;
  }

}
