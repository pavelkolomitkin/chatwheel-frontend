import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../security/data/models/user.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Geolocation} from "../../../../core/data/models/geolocation.model";

@Component({
  selector: 'app-text-location-view',
  templateUrl: './text-location-view.component.html',
  styleUrls: ['./text-location-view.component.css']
})
export class TextLocationViewComponent implements OnInit {

  // https://nominatim.openstreetmap.org/reverse?format=json&namedetails=1&accept-language=en&lat=48.851551&lon=44.597526

  isLoadingInfo: boolean = false;

  locationInfo: {
    country: string,
    county: string
  } = null;

  lastLocation: Geolocation = null;

  isError: boolean = false;

  _user: User;

  constructor(
    private http: HttpClient
  ) { }

  @Input()
  set user(value: User)
  {
    this._user = value;

    this.updateLocationInfo();
  }

  ngOnInit(): void {

  }

  getUrlInfo(location: Geolocation)
  {
    const result: string = environment.geoLocationInfoUri
      + '&accept-language='
      + environment.lang
      + '&lat=' + location.latitude
      + '&lon=' + location.longitude;

    return result;
  }

  updateLocationInfo()
  {
    if (!this._user || !this._user.geoLocation)
    {
      this.locationInfo = null;
      this.isLoadingInfo = false;

      return;
    }

    if (!this.hasLocationChanged(this._user.geoLocation))
    {
      return;
    }

    this.lastLocation = this._user.geoLocation;
    this.isLoadingInfo = true;

    const infoUrl: string = this.getUrlInfo(this.lastLocation);

    this.http.get(infoUrl)
      .toPromise()
      .then((data) => {

        // @ts-ignore
        const address = data.address;
        this.locationInfo = {
          // @ts-ignore
          country: address.country,
          // @ts-ignore
          county: address.county
        }

        this.isError = false;
        this.isLoadingInfo = false;

      })
      .catch((error) => {
        this.locationInfo = null;
        this.isError = true;
        this.isLoadingInfo = false;

      });
  }

  hasLocationChanged(newLocation: Geolocation): boolean
  {
    if (this.lastLocation === null)
    {
      return true;
    }

    return (this.lastLocation.latitude !== newLocation.latitude) ||
      (this.lastLocation.longitude !== newLocation.longitude);
  }

}
