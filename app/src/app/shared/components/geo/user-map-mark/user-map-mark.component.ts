import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../security/data/models/user.model";
import {Geolocation} from "../../../../core/data/models/geolocation.model";
import {MapComponentBaseComponent} from "../map-component-base/map-component-base.component";

@Component({
  selector: 'app-user-map-mark',
  templateUrl: './user-map-mark.component.html',
  styleUrls: ['./user-map-mark.component.css']
})
export class UserMapMarkComponent extends MapComponentBaseComponent implements OnInit {

  // TODO
  // add activity status with corresponding background colors
  // availability for clicking
  // if it's mine it should be clickable and lead to my page
  activityClass: string;

  @Input() user: User;

  constructor() {
    super()
  }

  ngOnInit(): void {

    this.activityClass = this.getActivityClass();

  }

  getActivityClass()
  {
    let result: string = '';

    return result;
  }

}
