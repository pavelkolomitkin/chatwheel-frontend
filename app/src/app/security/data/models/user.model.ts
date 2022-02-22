import {Country} from "../../../core/data/models/country.model";
import {UserInterest} from "../../../client/data/model/user-interest.model";
import {Geolocation} from "../../../core/data/models/geolocation.model";
import {environment} from "../../../../environments/environment";

export class User
{
  static ACTIVITY_ONLINE = 'online';

  static ACTIVITY_WAS_RECENTLY = 'recently';

  static ACTIVITY_OFFLINE = 'offline';


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

  amIBanned?: boolean;

  isBanned?: boolean

  static createFromRawData(data: any)
  {
    const result: User = Object.assign(new User(), data);

    return result;
  }

  getActivityStatus()
  {

    let result: string = User.ACTIVITY_OFFLINE;

    const lastActivity: Date = new Date(this.lastActivity);

    const timeDifference = Math.round(((+new Date()) - (+lastActivity)) / 1000);

    if (timeDifference < environment.onlineActivitySeconds)
    {
      result = User.ACTIVITY_ONLINE
    }
    else if (timeDifference < environment.recentOnlineActivitySeconds)
    {
      result = User.ACTIVITY_WAS_RECENTLY;
    }

    return result;
  }
}
