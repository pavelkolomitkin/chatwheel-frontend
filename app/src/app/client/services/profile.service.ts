import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {User} from "../../security/data/models/user.model";
import {Observable} from "rxjs";
import {Country} from "../../core/data/models/country.model";
import {UserInterest} from "../data/model/user-interest.model";
import {Geolocation} from "../../core/data/models/geolocation.model";

@Injectable()
export class ProfileService
{
  constructor(
    private readonly http: HttpClient
  ) {
  }

  updateFullName(name: string): Observable<User>
  {
    return this.http.put<{ user: User }>('/client/profile/fullname', { fullName: name })
      .pipe(
        map(data => User.createFromRawData(data.user))
      );
  }

  updateAbout(about: string): Observable<User>
  {
    return this.http.put<{ user: User }>('/client/profile/about', { about })
      .pipe(
        map(data => User.createFromRawData(data.user))
      );
  }

  updateResidenceCountry(country: Country)
  {
    return this.http.put<{ user: User }>('/client/profile/update-residence-country', { id: country.id })
      .pipe(
        map(data => User.createFromRawData(data.user))
      );
  }

  updateSearchCountry(country: Country)
  {
    return this.http.put<{ user: User }>('/client/profile/update-search-country', { id: country.id })
      .pipe(
        map(data => User.createFromRawData(data.user))
      );
  }

  addInterest(name: string)
  {
    return this.http.put<{ interest: UserInterest }>('/client/profile/add-interest', { name })
      .pipe(
        map( data => data.interest )
      );
  }

  removeInterest(name: string)
  {
    return this.http.put<{interest: UserInterest}>('/client/profile/remove-interest', { name })
      .pipe(
        map(data => data.interest)
      );
  }

  updateGeoLocation(location: Geolocation)
  {
    return this.http.put<{ user: User }>('/client/profile/update-location', location)
      .pipe(
        map(data => User.createFromRawData(data.user))
      );
  }

  deleteAccount()
  {
    return this.http.delete<{ user: User }>('/client/profile/remove-account')
      .pipe(
        map(data => User.createFromRawData(data.user))
      );
  }
}
