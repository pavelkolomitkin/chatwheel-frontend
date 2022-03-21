import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {User} from "../../../../security/data/models/user.model";
import {MapComponent} from "../map/map.component";
import {UserMapMarkComponent} from "../user-map-mark/user-map-mark.component";

@Component({
  selector: 'app-map-location-view',
  templateUrl: './map-location-view.component.html',
  styleUrls: ['./map-location-view.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MapLocationViewComponent implements OnInit, AfterViewInit
{
  @ViewChild(MapComponent) map: MapComponent;

  @Input() userUrl: string;

  _user: User;

  @Input()
  set user(value: User)
  {
    this._user = value;
    if (!!this.markComponent)
    {
      this.markComponent.instance.user = this._user;
    }

    this.changeDetector.markForCheck();
  }

  markComponent: ComponentRef<UserMapMarkComponent>;

  constructor(private changeDetector: ChangeDetectorRef) { }


  ngOnInit(): void {


  }

  ngAfterViewInit(): void {

    this.setUserPin();

  }

  setUserPin()
  {
    const { geoLocation } = this._user;

    this.markComponent = this.map.addMark(UserMapMarkComponent, geoLocation);

    this.markComponent.instance.user = this._user;
    this.markComponent.instance.url = this.userUrl;

    this.map.setCenter(geoLocation);

    this.changeDetector.detectChanges();
  }

  onMapReadyHandler(event)
  {


  }



  onLocationSelectedHandler(event)
  {

  }

  onMapMoveHandler(event)
  {

  }

}
