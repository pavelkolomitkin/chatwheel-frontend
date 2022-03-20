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

export interface MonthAxisItem
{
  year: number,
  month: number,
  monthName: string
}

@Component({
  selector: 'app-client-user-dynamic-statistics-chart',
  templateUrl: './client-user-dynamic-statistics-chart.component.html',
  styleUrls: ['./client-user-dynamic-statistics-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientUserDynamicStatisticsChartComponent implements OnInit, AfterViewInit {

  static MONTH_NAMES = {
    0: 'JANUARY',
    1: 'FEBRUARY',
    2: 'MARCH',
    3: 'APRIL',
    4: 'MAY',
    5: 'JUNE',
    6: 'JULY',
    7: 'AUGUST',
    8: 'SEPTEMBER',
    9: 'OCTOBER',
    10: 'NOVEMBER',
    11: 'DECEMBER'
  };

  @ViewChild('chart') chartElement: ElementRef;

  @Input() startMonth: Date;
  @Input() endMonth: Date;

  _data: ClientUserDynamic[];

  monthAxis: MonthAxisItem[] = [];
  columns: any[] = null;

  chart: any;

  @Input() set data(value: ClientUserDynamic[])
  {
    this._data = value;

    (async () => {

      await this.prepareData(value);
      this.updateChart();
    })();
  }

  constructor(
    private changeDetector: ChangeDetectorRef,
    private translate: TranslateService
  ) { }

  async prepareData(value: ClientUserDynamic[])
  {
    this.monthAxis = await this.getXAxis();

    const columns = [];

    for (let item of value)
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

  async getXAxis()
  {
    const result: any[] = [];

    let currentYear: number = this.startMonth.getFullYear();
    let currentMonth: number = this.startMonth.getMonth();

    const lastYear: number = this.endMonth.getFullYear();
    const lastMonth: number = this.endMonth.getMonth();

    while (currentYear <= lastYear)
    {
      while (currentMonth < 12)
      {
        const axisItem = await this.getAxisItem(currentYear, currentMonth);
        result.push(axisItem);

        if (currentMonth === lastMonth)
        {
          break;
        }

        currentMonth++;
      }

      currentMonth = 0;

      currentYear++;
    }

    return result;
  }


  async getAxisItem(year: number, month: number)
  {
    const monthName = ClientUserDynamicStatisticsChartComponent.MONTH_NAMES[month];
    const i18nMonthName = await this.translate.get(monthName).toPromise();

    return {
      year,
      month: month + 1,
      monthName: i18nMonthName
    };
  }

  ngOnInit(): void {
  }

  updateChart()
  {
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

  ngAfterViewInit(): void {

    this.updateChart();
  }

}
