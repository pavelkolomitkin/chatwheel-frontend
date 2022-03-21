import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {GetAbuseReportNumbers, GetClientUserNumber} from "../../../data/actions";
import {map, mergeMap} from "rxjs/operators";
import {ClientUserStatisticsService} from "../../../services/statistics/client-user-statistics.service";
import {ClientUserDynamic} from "./client-user-dynamic-statistics-chart/client-user-dynamic-statistics-chart.component";
import {AbuseReportStatisticsService} from "../../../services/statistics/abuse-report-statistics.service";
import {AbuseReportTypeStatistic} from "../../../data/model/statistics/abuse-report-type-statistic.model";

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

  allUserDynamicStatistic: ClientUserDynamic;
  emailUserDynamicStatistics: ClientUserDynamic;
  vkUserDynamicStatistics: ClientUserDynamic;

  dynamicStartMonth: Date;
  dynamicEndMonth: Date;


  abuseReportTotalNumber: Observable<number>;
  abuseReportNewNumber: Observable<number>;
  abuseReportTypeNumbers: AbuseReportTypeStatistic[] = null;
  abuseReportDynamicStatistics: any = null;

  constructor(
    private store: Store<State>,
    private userStatistic: ClientUserStatisticsService,
    private abuseReportStatistics: AbuseReportStatisticsService
  ) { }

  async ngOnInit() {


    this.abuseReportTotalNumber = this.store.pipe(select(state => state.admin.totalAbuseReportNumber));
    this.abuseReportNewNumber = this.store.pipe(select(state => state.admin.newAbuseReportNumber));


    this.getDynamicDates();
    const userStatistics = this.getUserDynamics();
    const abuseReportStatistics = this.getAbuseReportStatistics();
    const abuseReportDynamicStatistics = this.getAbuseReportDynamicStatistics();

    await userStatistics;
    await abuseReportStatistics;
    await abuseReportDynamicStatistics;
  }

  async getAbuseReportDynamicStatistics()
  {
    this.abuseReportDynamicStatistics = await this
      .abuseReportStatistics
      .getMonthStatistics(this.dynamicStartMonth, this.dynamicEndMonth)
      .toPromise();
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

    await this.getUserDynamicStatistics();
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

  async getUserDynamicStatistics()
  {
     const { all, email, vk } = await this.userStatistic.getMonthsStatistics(
       this.dynamicStartMonth,
       this.dynamicEndMonth
     ).toPromise();

     this.allUserDynamicStatistic = {
       label: 'ALL_TYPES',
       // @ts-ignore
       data: all,
       color: '#6c757d'
     };

     this.emailUserDynamicStatistics = {
       label: 'EMAIL_USERS',
       // @ts-ignore
       data: email,
       color: '#2dce89'
     };

     this.vkUserDynamicStatistics = {
       label: 'VK_USERS',
       // @ts-ignore
       data: vk,
       color: '#007bff'
     };
  }

}
