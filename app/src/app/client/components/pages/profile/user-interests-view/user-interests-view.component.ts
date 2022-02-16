import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../../security/data/models/user.model";

@Component({
  selector: 'app-user-interests-view',
  templateUrl: './user-interests-view.component.html',
  styleUrls: ['./user-interests-view.component.css']
})
export class UserInterestsViewComponent implements OnInit {

  @Input() noInterestsMessage: string;

  @Input() user: User;

  constructor() { }

  ngOnInit(): void {
  }

}
