import {Geolocation} from "../data/models/geolocation.model";

export class GeoLocationDeviceService
{
  getLocation(): Promise<Geolocation>
  {
    return new Promise<Geolocation>((resolve, reject) => {


      let watchPositionId = navigator.geolocation.watchPosition(
        (position: GeolocationPosition) => {

          navigator.geolocation.clearWatch(watchPositionId);

          const { coords: { latitude, longitude } } = position;

          resolve({ latitude, longitude });

        },
        (error: GeolocationPositionError) => {

          navigator.geolocation.clearWatch(watchPositionId);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      )
    });
  }
}
