import {Component, Input, OnInit} from '@angular/core';
import {Call} from "../../../../../../client/data/model/calls/call.model";

@Component({
  selector: '[app-call-list-item]',
  templateUrl: './call-list-item.component.html',
  styleUrls: ['./call-list-item.component.css']
})
export class CallListItemComponent implements OnInit {

  @Input() call: Call;

  constructor() { }

  ngOnInit(): void {

  }

}
