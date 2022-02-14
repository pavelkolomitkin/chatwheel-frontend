import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../security/data/models/user.model";
import {MapComponentBaseComponent} from "../map-component-base/map-component-base.component";

@Component({
  selector: 'app-user-map-mark',
  templateUrl: './user-map-mark.component.html',
  styleUrls: ['./user-map-mark.component.css'],
})
export class UserMapMarkComponent extends MapComponentBaseComponent implements OnInit {

  @Input() user: User;

  constructor() {
    super()
  }

  ngOnInit(): void {

  }
}
