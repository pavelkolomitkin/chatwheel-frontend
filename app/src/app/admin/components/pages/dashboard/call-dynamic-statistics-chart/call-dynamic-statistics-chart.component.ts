import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ChartUtilitiesService} from "../../../../data/model/statistics/chart-utilities.service";
import {MonthAxisItem} from "../../../../data/model/statistics/month-axis-item.model";
import {TranslateService} from "@ngx-translate/core";
import * as c3 from 'c3';
import {CallStatisticsService} from "../../../../services/statistics/call-statistics.service";

@Component({
  selector: 'app-call-dynamic-statistics-chart',
  templateUrl: './call-dynamic-statistics-chart.component.html',
  styleUrls: ['./call-dynamic-statistics-chart.component.css']
})
export class CallDynamicStatisticsChartComponent implements OnInit, AfterViewInit {

  static CHART_LEGENDS = {
    all: 'CALLS',
    chatWheel: 'CHAT_WHEEL',
    directCalls: 'DIRECT_CALLS'
  }

  @ViewChild('chart') chartElement: ElementRef;

  @Input() startMonth: Date;
  @Input() endMonth: Date;

  _statistics: any = null;

  chart: any = null;

  monthAxis: MonthAxisItem[];

  constructor(
    private utilities: ChartUtilitiesService,
    private translate: TranslateService,
    private callStatistics: CallStatisticsService
  ) { }

  async ngOnInit()
  {
    await this.getData();
    await this.updateChart();
  }

  async getData()
  {
    this._statistics = await this
      .callStatistics
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

    const columns = await this.getColumns();
    const xAxis: any[] = this.monthAxis.map(item => item.monthName + ' ' + item.year);


    this.chart = c3.generate(
      {
        bindto: '#chart-call-dynamics',
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

  async getColumns()
  {
    const result: any[] = [];

    for (const statisticKey of [
      'all',
      'chatWheel',
      'directCalls'
    ]) {

      const column: number[] = this.getColumn(statisticKey);
      if (!column)
      {
        continue;
      }

      const label: string = CallDynamicStatisticsChartComponent.CHART_LEGENDS[statisticKey];
      const i18nLabel: string = await this
        .translate
        .get(label)
        .toPromise();

      result.push([
        i18nLabel,
        ...column
      ]);

    }

    return result;
  }

  getColumn(key: string): number[] | null
  {
    const statistics: any = this._statistics[key];
    if (!statistics)
    {
      return null;
    }

    const result: number[] = [];
    this.monthAxis.forEach(item => {

      if (!!statistics[item.year] && !!statistics[item.year][item.month])
      {
        result.push(statistics[item.year][item.month]);
      }
      else
      {
        result.push(0);
      }

    });

    return result;
  }

  async ngAfterViewInit() {

    await this.updateChart();
  }

}
