
export class User
{
  id: string;

  fullName: string;

  createdAt: string;

  updatedAt: string;

  roles: string[] = [];

  avatar?: {};

  lastActivity: string

  isBlocked: boolean;
}
