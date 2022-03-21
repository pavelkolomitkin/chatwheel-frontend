import {Component, Input, OnInit} from '@angular/core';
import {AbuseReport} from "../../../../../../core/data/models/abuse-report.model";

@Component({
  selector: 'app-client-report-abuse-item',
  templateUrl: './client-report-abuse-item.component.html',
  styleUrls: ['./client-report-abuse-item.component.css']
})
export class ClientReportAbuseItemComponent implements OnInit {

  @Input() report: AbuseReport;

  @Input() reportNumber: number;

  constructor() { }

  ngOnInit(): void {
  }

}
