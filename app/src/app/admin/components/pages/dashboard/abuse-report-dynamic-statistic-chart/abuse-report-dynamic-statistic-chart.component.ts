import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../app.state";
import {filter, first} from "rxjs/operators";
import {AbuseReportType} from "../../../../../core/data/models/abuse-report-type.model";
import {ChartUtilitiesService} from "../../../../data/model/statistics/chart-utilities.service";
import {MonthAxisItem} from "../../../../data/model/statistics/month-axis-item.model";
import * as c3 from 'c3';
import {AbuseReportStatisticsService} from "../../../../services/statistics/abuse-report-statistics.service";

@Component({
  selector: 'app-abuse-report-dynamic-statistic-chart',
  templateUrl: './abuse-report-dynamic-statistic-chart.component.html',
  styleUrls: ['./abuse-report-dynamic-statistic-chart.component.css']
})
export class AbuseReportDynamicStatisticChartComponent implements OnInit, AfterViewInit {

  @ViewChild('chart') chartElement: ElementRef;

  @Input() startMonth: Date;
  @Input() endMonth: Date;

  _statistics: any = null;

  abuseTypes: AbuseReportType[];

  monthAxis: MonthAxisItem[];

  chart: any;

  constructor(
    private store: Store<State>,
    private utilities: ChartUtilitiesService,
    private abuseReportStatistics: AbuseReportStatisticsService,
  ) { }

  async ngOnInit() {

    this.abuseTypes = await this
      .store
      .pipe(
        select(state => state.admin.abuseReportTypes),
        filter(result => !!result),
        filter(result => result.length > 0),
        first()).
      toPromise();

    await this.getData();

    await this.updateChart();
  }

  async getData()
  {
    this._statistics = await this
      .abuseReportStatistics
      .getMonthStatistics(this.startMonth, this.endMonth)
      .toPromise();
  }

  async updateChart()
  {
    if (!this.chartElement || !this._statistics)
    {
      return;
    }

    this.monthAxis = await this.utilities.getMonthsAxis(this.startMonth, this.endMonth);

    const columns = this.getColumns();
    const xAxis: any[] = this.monthAxis.map(item => item.monthName + ' ' + item.year);

    this.chart = c3.generate(
      {
        bindto: '#chart-abuse-report-dynamics',
        data: {
          columns: columns,
        },
        axis: {
          x: {
            type: 'category',
            categories: xAxis
          }
        },
      }
    );
  }

  getColumns()
  {
    const result: any[] = [];

    for (let abuseType of this.abuseTypes)
    {
      const column: any[] =
        [
          abuseType.title,
          ...this.getAbuseTypeColumn(abuseType)
        ];

      result.push(column);
    }

    return result;
  }

  getAbuseTypeColumn(type: AbuseReportType): number[]
  {
    const result: number[] = [];

    const typeStatistics = this._statistics[type.id];
    this.monthAxis.forEach(item => {

      let value: number = 0;

      if (!!typeStatistics)
      {
        if (!!typeStatistics[item.year] && !!typeStatistics[item.year][item.month])
        {
          value = typeStatistics[item.year][item.month];
        }
      }

      result.push(value);
    });

    return result;
  }

  async ngAfterViewInit() {

    await this.updateChart();
  }




}
