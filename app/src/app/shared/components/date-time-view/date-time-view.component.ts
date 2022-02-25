import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {isNumber} from 'util';

@Component({
  selector: '[app-date-time]',
  templateUrl: './date-time-view.component.html',
  styleUrls: ['./date-time-view.component.css']
})
export class DateTimeViewComponent implements OnInit {

  static DISPLAY_FORMAT_AGO = 'ago';
  static DISPLAY_FORMAT_NORMAL = 'normal';

  displayFormat = DateTimeViewComponent.DISPLAY_FORMAT_NORMAL;

  _value: any;

  @Input()
  set value(value: any)
  {
    if (typeof value === 'number')
    {
      this._value = moment.unix(value);
    }
    else
    {
      this._value = moment(value);
    }

    if (moment().diff(this._value, 'days') >= 2)
    {
      this.displayFormat = DateTimeViewComponent.DISPLAY_FORMAT_NORMAL;
    }
    else
    {
      this.displayFormat = DateTimeViewComponent.DISPLAY_FORMAT_AGO;
    }

  }

  constructor() { }

  ngOnInit() {

  }

}
