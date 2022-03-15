import {AuthUserTypes} from "./auth-user-types.enum";
import {SortingType} from "../../../core/data/models/sorting-type.enum";
import {Country} from "../../../core/data/models/country.model";

export interface ClientUserListFilter
{
  sortField?: string;
  sortType?: SortingType;
  authType?: AuthUserTypes;
  isNotActivated?: boolean;
  isBlocked?: boolean;
  residenceCountry?: Country;
  searchCountry?: Country;
  isDeleted?: boolean;
}
