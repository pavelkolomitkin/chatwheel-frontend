import {Geolocation} from "../data/models/geolocation.model";

export class GeoLocationDeviceService
{
  getLocation(): Promise<Geolocation>
  {
    return new Promise<Geolocation>((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {

          const { coords: { latitude, longitude } } = position;

          resolve({ latitude, longitude });

        },
        (error: GeolocationPositionError) => {
          reject(error);
        },
        {
          enableHighAccuracy: true
        }
      )
    });
  }
}
