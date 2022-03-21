import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import * as c3 from 'c3';
import {MonthAxisItem} from "../../../../data/model/statistics/month-axis-item.model";
import {ChartUtilitiesService} from "../../../../data/model/statistics/chart-utilities.service";
import {ClientUserStatisticsService} from "../../../../services/statistics/client-user-statistics.service";

export interface ClientUserDynamic
{
  label: string,
  color: string,
  data: [{
    _id: {
      year: number,
      month: number,
    },
    total: number
  }]
}

@Component({
  selector: 'app-client-user-dynamic-statistics-chart',
  templateUrl: './client-user-dynamic-statistics-chart.component.html',
  styleUrls: ['./client-user-dynamic-statistics-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientUserDynamicStatisticsChartComponent implements OnInit, AfterViewInit {

  @ViewChild('chart') chartElement: ElementRef;

  @Input() startMonth: Date;
  @Input() endMonth: Date;

  _data: ClientUserDynamic[];

  monthAxis: MonthAxisItem[] = [];
  columns: any[] = null;

  chart: any;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private translate: TranslateService,
    private utilities: ChartUtilitiesService,
    private userStatistic: ClientUserStatisticsService,
  ) { }

  async ngOnInit() {

    await this.getData();

    await this.updateChart();
  }

  async getData()
  {
    const { all, email, vk } = await this.userStatistic.getMonthsStatistics(
      this.startMonth,
      this.endMonth
    ).toPromise();

    this._data = [
      {
        label: 'ALL_TYPES',
        // @ts-ignore
        data: all,
        color: '#6c757d'
      },
      {
        label: 'EMAIL_USERS',
        // @ts-ignore
        data: email,
        color: '#2dce89'
      },
      {
        label: 'VK_USERS',
        // @ts-ignore
        data: vk,
        color: '#007bff'
      }
    ];
  }

  async prepareData()
  {
    if (!this._data)
    {
      return;
    }

    this.monthAxis = await this.utilities.getMonthsAxis(this.startMonth, this.endMonth);

    const columns = [];

    for (let item of this._data)
    {
      const columnData = this.getColumn(item, this.monthAxis);

      columns.push([
        await this.translate.get(item.label).toPromise(),
        ...columnData
      ]);
    }
    this.columns = columns;
  }

  getColumn(data: ClientUserDynamic, monthAxis: MonthAxisItem[])
  {
    const result: number[] = [];

    for (let index = 0; index < monthAxis.length; index++)
    {
      const monthAxisItem = monthAxis[index];
      const dataIndex = data.data.findIndex(item => (item._id.year === monthAxisItem.year) && (item._id.month === monthAxisItem.month));

      if (dataIndex !== -1)
      {
        result.push(data.data[dataIndex].total)
      }
      else
      {
        result.push(0);
      }
    }

    return result;
  }

  async updateChart()
  {
    await this.prepareData();

    if (!this.chartElement || !this.columns)
    {
      return;
    }

    const xAxis: any[] = this.monthAxis.map(item => item.monthName + ' ' + item.year);

    this.chart = c3.generate({
      bindto: '#chart-user-dynamics',
      data: {
        columns: this.columns,
        type: 'bar'
      },
      axis: {
        x: {
          type: 'category',
          categories: xAxis
        }
      },
      bar: {
        width: {
          ratio: 0.5
        }
      },
      color: {
        pattern: this._data.map(item => item.color)
      }
    });
  }

  async ngAfterViewInit() {

    await this.updateChart();
  }

}
