import * as actions from './actions';
import {AuthUserTypes} from "./model/user-types.enum";


export interface State
{
  clientUserTotalNumber: number,
  clientEmailUserNumber: number,
  clientVkUserNumber: number,

  newAbuseReportNumber: number,
}

export const initialState: State = {
  clientUserTotalNumber: 0,
  clientEmailUserNumber: 0,
  clientVkUserNumber: 0,

  newAbuseReportNumber: 0
}

export function reducer(state: State = initialState, action: actions.AdminUserActions): State
{
  switch (action.type)
  {
    case actions.ADMIN_GET_TOTAL_NUMBER_CLIENT_USERS_SUCCESS:

      let property: string = '';

      switch (action.authType)
      {
        case AuthUserTypes.EMAIL:
          property = 'clientEmailUserNumber';
          break;

        case AuthUserTypes.VK:
          property = 'clientVkUserNumber';
          break;

        default:
          property = 'clientUserTotalNumber';
      }

      return {
        ...state,
        [property]: action.value
      }

    case actions.ADMIN_GET_TOTAL_NUMBER_CLIENT_USERS_ERROR:

      return {
        ...state,
        clientEmailUserNumber: 0,
        clientVkUserNumber: 0,
        clientUserTotalNumber: 0
      };


    case actions.ADMIN_GET_NEW_ABUSE_REPORT_NUMBER_SUCCESS:

      return {
        ...state,
        newAbuseReportNumber: action.value
      };

    case actions.ADMIN_GET_NEW_ABUSE_REPORT_NUMBER_ERROR:

      return {
        ...state,
        newAbuseReportNumber: 0
      };

    default:

      return state;
  }
}
