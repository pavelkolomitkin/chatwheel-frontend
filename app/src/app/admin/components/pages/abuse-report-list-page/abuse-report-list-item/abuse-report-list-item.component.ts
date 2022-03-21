import {Component, Input, OnInit} from '@angular/core';
import {AbuseReport} from "../../../../../core/data/models/abuse-report.model";

@Component({
  selector: '[app-abuse-report-list-item]',
  templateUrl: './abuse-report-list-item.component.html',
  styleUrls: ['./abuse-report-list-item.component.css']
})
export class AbuseReportListItemComponent implements OnInit {

  @Input() report: AbuseReport;

  constructor() { }

  ngOnInit(): void {

  }

}
