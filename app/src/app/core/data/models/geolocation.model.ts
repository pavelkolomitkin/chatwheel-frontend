import {environment} from "../../../../environments/environment";

export const isEqual = (location1: Geolocation, location2: Geolocation) =>
{
  return ((Math.abs(location1.longitude - location2.longitude) < environment.nearGeoCoordinateMaxDelta)
    && (Math.abs(location1.latitude - location2.latitude) < environment.nearGeoCoordinateMaxDelta));
}

export interface Geolocation
{
  longitude: number;

  latitude: number;
}
