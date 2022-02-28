import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../../security/data/models/user.model";

@Component({
  selector: 'app-direct-call-window',
  templateUrl: './direct-call-window.component.html',
  styleUrls: ['./direct-call-window.component.css']
})
export class DirectCallWindowComponent implements OnInit {

  _initiatedToAddressee: User = null;


  @Input() set initiateToAddressee (value: User)
  {
    this._initiatedToAddressee = value;
  }

  //@Input() set

  constructor() { }

  ngOnInit(): void {
  }

}
