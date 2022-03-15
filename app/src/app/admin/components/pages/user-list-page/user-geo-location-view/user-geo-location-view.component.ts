import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../../security/data/models/user.model";

@Component({
  selector: 'app-user-geo-location-view',
  templateUrl: './user-geo-location-view.component.html',
  styleUrls: ['./user-geo-location-view.component.css']
})
export class UserGeoLocationViewComponent implements OnInit {

  @Input() user: User

  constructor() { }

  ngOnInit(): void {
  }

}
