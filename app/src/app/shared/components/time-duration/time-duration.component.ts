import {Component, Input, OnInit} from '@angular/core';
import * as moment from "moment";

@Component({
  selector: '[app-time-duration]',
  templateUrl: './time-duration.component.html',
  styleUrls: ['./time-duration.component.css']
})
export class TimeDurationComponent implements OnInit {

  duration: string = null

  @Input() set interval({ startTime, endTime }: { startTime: any, endTime: any })
  {
    const start = this.getMomentFromValue(startTime);
    const end = this.getMomentFromValue(endTime);

    const milliseconds = end.diff(start, 'milliseconds');
    this.duration = moment.utc(milliseconds).format('HH:mm:ss');
  }

  getMomentFromValue(value: any)
  {
    if (typeof value === 'number')
    {
      return moment.unix(value);
    }
    else
    {
      return moment(value);
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
