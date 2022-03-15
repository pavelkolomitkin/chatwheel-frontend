import {AuthUserTypes} from "./auth-user-types.enum";

export interface ClientUserListFilter
{
  sortField?: string;
  sortType?: string;
  userType?: AuthUserTypes;
  isActivated?: boolean;
  isBlocked?: boolean;
  residenceCountry?: string;
  deleted?: boolean;
}
