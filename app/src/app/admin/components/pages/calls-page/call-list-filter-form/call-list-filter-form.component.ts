import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbInputDatepicker
} from '@ng-bootstrap/ng-bootstrap';
import {CallListFormFilter} from "../../../../data/model/call-list-form.filter";



@Component({
  selector: 'app-call-list-filter-form',
  templateUrl: './call-list-filter-form.component.html',
  styleUrls: ['./call-list-filter-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CallListFilterFormComponent implements OnInit {

  @Output('onChange') changeEmitter: EventEmitter<CallListFormFilter> =
    new EventEmitter<CallListFormFilter>();

  _startDate: Date;

  _endDate: Date;

  @Input() set endDate (value: Date)
  {
    this._endDate = value ? value : new Date();

    this.toDate = this.getDateFromObject(this._endDate);
  }


  @Input() set startDate (value: Date)
  {
    this._startDate = value;

    if (!this._startDate)
    {
      this._startDate = new Date(this._endDate.getTime());
      this._startDate.setMonth(this._endDate.getMonth() - 1);
    }

    this.fromDate = this.getDateFromObject(this._startDate);

    this.changeDetector.detectChanges();
  }



  getDateFromString(value: string): NgbDate | null
  {
    if (!value)
    {
      return null;
    }

    const date: Date = new Date(value);

    return this.getDateFromObject(date);
  }

  getDateFromObject(date: Date)
  {
    return new NgbDate(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
  }

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;


  constructor(
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

  onDateSelection(date: NgbDate, datePicker: NgbInputDatepicker) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    if (this.fromDate && this.toDate)
    {

      this._startDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
      this._endDate = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);

      this.changeEmitter.emit({ startDate: this._startDate, endDate: this._endDate });

      datePicker.close();
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
}
