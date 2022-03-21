import {Component, Input, OnInit} from '@angular/core';
import {AbuseReportTypeStatistic} from "../../../../data/model/statistics/abuse-report-type-statistic.model";
import {TYPE_STYLES} from "../../../../data/model/abuse-report-type.styles";

@Component({
  selector: 'app-abuse-report-type-statistic',
  templateUrl: './abuse-report-type-statistic.component.html',
  styleUrls: ['./abuse-report-type-statistic.component.css']

})
export class AbuseReportTypeStatisticComponent implements OnInit {

  @Input() statistic: AbuseReportTypeStatistic;

  _total: number = 0;
  percentage: number = 0;

  @Input() set total (value: number)
  {
    this._total = value;

    this.percentage = this.getPercentage();

  }

  getPercentage()
  {
    if (!this._total)
    {
      return 0;
    }

    return (this.statistic.totalNumber / this._total) * 100;
  }

  getTypeColor()
  {
    return TYPE_STYLES[this.statistic.abuseType.code];
  }

  constructor() { }

  ngOnInit(): void {
  }

}
