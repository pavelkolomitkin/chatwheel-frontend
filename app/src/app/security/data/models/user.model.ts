import {Country} from "../../../core/data/models/country.model";
import {UserInterest} from "../../../client/data/model/user-interest.model";
import {Geolocation} from "../../../core/data/models/geolocation.model";
import {environment} from "../../../../environments/environment";

export enum SocialMediaType {
  VK = 0,
  FB = 1,
  GOOGLE = 2,
}

const SocialNetUserAvatarPictures = {
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

  isSuperAdmin?: boolean;

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
    const pictures = this.socialMediaPhotos;
    if (!pictures)
    {
      return null;
    }

    const socialNetPictureSize = SocialNetUserAvatarPictures[size];
    return pictures[socialNetPictureSize];
  }

  hasPicture()
  {
    return !!this.avatar;
  }

  getDefaultAvatar()
  {
    return environment.defaultAvatar;
  }

  getAvatarPicture(size: string)
  {
    if (this.deleted)
    {
      return this.getDefaultAvatar();
    }

    let result = this.getThumbAvatar(size);
    if (!result)
    {
      result = this.getSocialMediaAvatar(size);
    }

    if (!result)
    {
      result = this.getDefaultAvatar();
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
