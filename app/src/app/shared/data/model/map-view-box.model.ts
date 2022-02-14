import {Geolocation} from "../../../core/data/models/geolocation.model";

export interface MapViewBox
{
  topLeft: Geolocation;

  bottomRight: Geolocation;

  zoom: number;
}
