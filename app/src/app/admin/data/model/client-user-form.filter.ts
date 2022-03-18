import {AuthUserTypes} from "./auth-user-types.enum";
import {Country} from "../../../core/data/models/country.model";

export interface ClientUserFormFilter {

  authType?: AuthUserTypes,

  residenceCountry?: Country,

  searchCountry?: Country,

  isActivated?: boolean,

  isBlocked?: boolean,

  isDeleted?: boolean
}
