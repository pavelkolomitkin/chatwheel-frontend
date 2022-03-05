import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../../app.state";
import {User} from "../../../../../../security/data/models/user.model";
import {Observable} from "rxjs";
import {MapViewBox} from "../../../../../../shared/data/model/map-view-box.model";
import {Geolocation} from "../../../../../../core/data/models/geolocation.model";
import {MapComponent} from "../../../../../../shared/components/geo/map/map.component";
import {GeoSearchService} from "../../../../../services/search/geo-search.service";
import {GlobalNotification} from "../../../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../../../core/data/models/notification.model";
import {UserMapMarkComponent} from "../../../../../../shared/components/geo/user-map-mark/user-map-mark.component";

@Component({
  selector: 'app-search-map-page',
  templateUrl: './search-map-page.component.html',
  styleUrls: ['./search-map-page.component.css'],
})
export class SearchMapPageComponent implements OnInit, OnDestroy, AfterViewInit {

  static REQUEST_USERS_DELAY = 500;

  @ViewChild(MapComponent) map: MapComponent;

  user: Observable<User>;

  loadTimeoutId: any = null;

  users: {[key: string]: {
    user: User,
    pin: ComponentRef<UserMapMarkComponent>
    }} = {};

  constructor(
    private store: Store<State>,
    private service: GeoSearchService,
  ) { }

  async ngOnInit() {

    this.user = this.store.pipe(select(state => state.security.user));
  }

  ngOnDestroy(): void {


  }

  async onMapReadyHandler(event)
  {

  }

  onMapMoveHandler(viewBox: MapViewBox)
  {
    this.loadUsersWithDelay();
  }

  onLocationSelectedHandler(location: Geolocation)
  {

  }

  async ngAfterViewInit() {
    await this.loadUsers();
  }

  async loadUsers()
  {
    const box: MapViewBox = this.map.getViewBox();

    try {
      const users: User[] = await this.service.getUsersWithInBox(box).toPromise();
      this.updateUserPins(users);
    }
    catch (error)
    {
      this.store.dispatch(
        new GlobalNotification(new Notification(
          NotificationType.ERROR,
          'Cannot find anyone',
          'Error')
        )
      )
      ;
    }
  }

  loadUsersWithDelay()
  {
    if (!!this.loadTimeoutId)
    {
      clearTimeout(this.loadTimeoutId);
      this.loadTimeoutId = null;
    }

    this.loadTimeoutId = setTimeout(async () => {

      await this.loadUsers()

    }, SearchMapPageComponent.REQUEST_USERS_DELAY);
  }

  updateUserPins(newUsers: User[])
  {
    const newUsersHash: {[key: string] : User} = {};

    for (let user of newUsers)
    {
      this.updateUserPin(user);

      newUsersHash[user.id] = user;
    }

    for (let userId of Object.keys(this.users))
    {
      if (!newUsersHash[userId])
      {
        this.removeUserById(userId);
      }
    }
  }

  removeUserById(userId: string)
  {
    const { pin } = this.users[userId];

    this.map.removeMark(pin);
    delete this.users[userId];
  }

  updateUserPin(user: User)
  {
    const data = this.users[user.id];
    if (!data)
    {
      // missing should be created and appended on the map
      const pin = this.map.addMark(UserMapMarkComponent, user.geoLocation);
      pin.instance.user = user;

      this.users[user.id] = {
        user: user,
        pin: pin
      };
    }
    else {
      // existed one should be updated in its data

      data.user = user;
      data.pin.instance.user = user;

      this.users[user.id] = {...data};
    }
  }
}
