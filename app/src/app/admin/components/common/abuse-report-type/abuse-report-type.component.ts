import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AbuseReportType} from "../../../../core/data/models/abuse-report-type.model";
import {TYPE_STYLES} from "../../../data/model/abuse-report-type.styles";


@Component({
  selector: 'app-abuse-report-type',
  templateUrl: './abuse-report-type.component.html',
  styleUrls: ['./abuse-report-type.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbuseReportTypeComponent implements OnInit {

  _type: AbuseReportType;

  @Input() set type(value: AbuseReportType)
  {
    this._type = value;

    this.changeDetector.detectChanges();
  }

  getClass()
  {
    if (!this._type)
    {
      return;
    }

    return TYPE_STYLES[this._type.code];
  }

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

}
