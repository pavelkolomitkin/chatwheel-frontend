import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import {USER_REQUEST_UPDATE_GEOLOCATION, UserGeolocationPermissionChange} from '../actions';
import {tap} from 'rxjs/operators';
import {ProfileService} from '../../services/profile.service';
import {State} from '../../../app.state';
import {USER_LOGOUT, UserUpdated} from "../../../security/data/actions";
import {environment} from "../../../../environments/environment";
import {Geolocation} from "../../../core/data/models/geolocation.model";
import {User} from "../../../security/data/models/user.model";
import {GeoLocationDeviceService} from "../../../core/services/geo-location-device.service";
import {GlobalNotification} from "../../../core/data/actions";
import {Notification, NotificationType} from "../../../core/data/models/notification.model";

@Injectable()
export class GeolocationEffects
{
  userLogout: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(USER_LOGOUT),
      tap(() => {

        this.clearUpdateLocationTimeout();
      })
    );
  }, { dispatch: false });

  requestUpdateGeolocation:Observable<Action> = createEffect(() => {
    return this.actions.pipe(

      ofType(USER_REQUEST_UPDATE_GEOLOCATION),
      tap(async () => {

        const location: Geolocation = await this.requestDeviceLocation();
        this.store.dispatch(new UserGeolocationPermissionChange(location !== null));

        if (!location)
        {
          return
        }

        //debugger
        await this.updateLocation();
      })
    )
  }, { dispatch: false });


  async requestDeviceLocation()
  {
    //debugger
    let location: Geolocation = null;

    try {
      location = await this.geoLocationDevice.getLocation();
    }
    catch (error)
    {
      this.store.dispatch(new GlobalNotification(new Notification(NotificationType.INFO,
        'Turn on geolocation in order to let other users where you are! :-)'
      )));
    }

    return location;

  }

  async updateLocation()
  {
    let location: Geolocation = await this.requestDeviceLocation();
    if (!location)
    {
      this.store.dispatch(new UserGeolocationPermissionChange(false));
      return;
    }

    try {
      const user: User = await this.profileService.updateGeoLocation(location).toPromise();
      this.store.dispatch(new UserUpdated(user));
    }
    catch (error)
    {
      this.store.dispatch(new GlobalNotification(
        new Notification(NotificationType.ERROR, 'Cannot update location. Please try it later')
      ))

      return;
    }

    this.clearUpdateLocationTimeout();
    this.updateLocationTimeout = setTimeout(() => {
        this.updateLocation();
      }, environment.geoLocationUpdateInterval
    );
  }


  async updateUserLocation({ latitude, longitude }: Geolocation)
  {
    const user: User = await this.profileService.updateGeoLocation({ latitude, longitude }).toPromise();
    ////debugger
    this.store.dispatch(new UserUpdated(user));
  }

  clearUpdateLocationTimeout()
  {
    if (this.updateLocationTimeout !== null)
    {
      clearTimeout(this.updateLocationTimeout);
      this.updateLocationTimeout = null;
    }
  }

  updateLocationTimeout: any = null;

  constructor(
    private store: Store<State>,
    private actions: Actions,
    private profileService: ProfileService,
    private geoLocationDevice: GeoLocationDeviceService
  ) { }
}
