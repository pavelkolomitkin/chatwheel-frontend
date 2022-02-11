import {Country} from "../../../core/data/models/country.model";
import {UserInterest} from "../../../client/data/model/user-interest.model";
import {Geolocation} from "../../../core/data/models/geolocation.model";

export class User
{
  id: string;

  email?: string;

  fullName: string;

  createdAt: string;

  updatedAt: string;

  roles: string[] = [];

  avatar?: {};

  lastActivity: string

  isBlocked: boolean;

  geoLocation?: Geolocation;

  about?: string;

  avatarThumbs: any = {};

  residenceCountry?: Country;

  searchCountry?: Country;

  interests?: UserInterest[];

  static createFromRawData(data: any)
  {
    const result: User = Object.assign(new User(), data);

    return result;
  }
}
