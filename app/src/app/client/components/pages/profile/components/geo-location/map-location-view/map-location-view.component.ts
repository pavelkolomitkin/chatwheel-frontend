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
import {User} from "../../../../../../../security/data/models/user.model";
import {MapComponent} from "../../../../../../../shared/components/geo/map/map.component";
import {UserMapMarkComponent} from "../../../../../../../shared/components/geo/user-map-mark/user-map-mark.component";

@Component({
  selector: 'app-map-location-view',
  templateUrl: './map-location-view.component.html',
  styleUrls: ['./map-location-view.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MapLocationViewComponent implements OnInit, AfterViewInit
{


  @ViewChild(MapComponent) map: MapComponent;

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
    //debugger

  }

  ngAfterViewInit(): void {
    const { geoLocation } = this._user;

    this.markComponent = this.map.addMark(UserMapMarkComponent, geoLocation);

    this.markComponent.instance.user = this._user;

    this.map.setCenter(geoLocation);

    this.changeDetector.detectChanges();

  }

  onMapReadyHandler(event)
  {
//debugger

  }



  onLocationSelectedHandler(event)
  {
    console.log('Map clicked...');
    console.log(event);
  }

  onMapMoveHandler(event)
  {
    console.log('Map moved...');
    console.log(event);
  }

}
