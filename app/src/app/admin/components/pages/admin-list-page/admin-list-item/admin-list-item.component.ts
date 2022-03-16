import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../../security/data/models/user.model";

@Component({
  selector: '[app-admin-list-item]',
  templateUrl: './admin-list-item.component.html',
  styleUrls: ['./admin-list-item.component.css']
})
export class AdminListItemComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit(): void {
  }

}
