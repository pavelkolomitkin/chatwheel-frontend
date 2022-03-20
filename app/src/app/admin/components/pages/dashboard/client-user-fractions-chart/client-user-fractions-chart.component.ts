import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as c3 from 'c3';

export interface UserTypeDataSet {
  label: string,
  number: number,
  color: string,
}

@Component({
  selector: 'app-client-user-fractions-chart',
  templateUrl: './client-user-fractions-chart.component.html',
  styleUrls: ['./client-user-fractions-chart.component.css']
})
export class ClientUserFractionsChartComponent implements OnInit, AfterViewInit {

  @ViewChild('chart') chartElement: ElementRef;

  data: any = {};

  dataSet: UserTypeDataSet[];

  chart: any;

  @Input() set numbers (value: UserTypeDataSet[])
  {

    this.dataSet = value;

    this.updateChart();
  }

  constructor() { }

  getChartData(value: UserTypeDataSet[])
  {
    return {
      type: 'pie',
      columns: value.map(item => {
        return [item.label + ' ', item.number]
      }),
    };
  }


  updateChart()
  {
    if (!this.chartElement)
    {
      return;
    }

    const data = this.getChartData(this.dataSet);
    const colors = this.dataSet.map(item => item.color);

    this.chart = c3.generate({
      bindto: '#chart',
      data: data,
      color: {
        pattern: colors
      }
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.updateChart();
  }

}
