
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

  about: string;

  static createFromRawData(data: any)
  {
    const result: User = Object.assign(new User(), data);

    return result;
  }
}
