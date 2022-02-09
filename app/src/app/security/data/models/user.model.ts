import {Country} from "../../../core/data/models/country.model";

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

  geoLocation?: {};

  about?: string;

  avatarThumbs: any = {};

  residenceCountry?: Country;

  searchCountry?: Country;

  static createFromRawData(data: any)
  {
    const result: User = Object.assign(new User(), data);

    return result;
  }
}
