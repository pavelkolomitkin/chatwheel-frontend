import {Country} from "../../../core/data/models/country.model";
import {UserInterest} from "../../../client/data/model/user-interest.model";
import {Geolocation} from "../../../core/data/models/geolocation.model";
import {environment} from "../../../../environments/environment";

export enum SocialMediaType {
  VK = 0,
  GOOGLE = 1
}

const VkUserAvatarPictures = {
  extraSmall: 'photo_50',
  small: 'photo_50',
  mediumSmall: 'photo_50',
  mediumMedium: 'photo_100',
  medium: 'photo_200',
  original: 'photo_400_orig'
};

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

  isBlocked?: boolean;

  blockingReason?: string

  geoLocation?: Geolocation;

  about?: string;

  avatarThumbs: any = {};

  residenceCountry?: Country;

  searchCountry?: Country;

  interests?: UserInterest[];

  isActivated?: boolean;

  amIBanned?: boolean;

  isBanned?: boolean

  deleted?: boolean;

  socialMediaType?: SocialMediaType;

  socialMediaUserId?: string;

  socialMediaPhotos?: {};

  isSocialMediaUser()
  {
    return !!this.socialMediaUserId;
  }

  isVkUser()
  {
    return this.socialMediaType === SocialMediaType.VK;
  }

  getThumbAvatar(size)
  {
    if (this.avatarThumbs && (this.avatarThumbs[size]))
    {
      return environment.baseApiUrl + this.avatarThumbs[size];
    }
    else {

      return null;
    }
  }

  getSocialMediaAvatar(size)
  {
    if (this.socialMediaType === SocialMediaType.VK)
    {
      const pictures = this.socialMediaPhotos;
      if (!pictures)
      {
        return null;
      }

      const vkSize = VkUserAvatarPictures[size];
      return pictures[vkSize];
    }

    return null;
  }

  getAvatarPicture(size: string)
  {
    if (this.deleted)
    {
      return environment.defaultAvatar;
    }

    let result = this.getThumbAvatar(size);
    if (!result)
    {
      result = this.getSocialMediaAvatar(size);
    }

    if (!result)
    {
      result = environment.defaultAvatar;
    }

    return result;
  }

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
