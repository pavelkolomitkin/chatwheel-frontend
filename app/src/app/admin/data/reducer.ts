import * as actions from './actions';
import {AuthUserTypes} from "./model/auth-user-types.enum";
import {User} from "../../security/data/models/user.model";
import {AbuseReport} from "../../core/data/models/abuse-report.model";


export interface State
{
  clientUserTotalNumber: number,
  clientEmailUserNumber: number,
  clientVkUserNumber: number,

  newAbuseReportNumber: number,

  lastBlockingUser: User,
  lastBlockedUser: User,
  lastBlockedUserError: {},

  lastUnBlockingUser: User,
  lastUnBlockedUser: User;
  lastUnBlockedUserError: {},

  lastDeletingUser: User,
  lastDeletedUser: User,
  lastDeletedUserError: {},

  lastOpenedAbuseReport: AbuseReport,
  lastReadAbuseReport: AbuseReport,
  lastReadAbuseReportError: {},
}

export const initialState: State = {
  clientUserTotalNumber: 0,
  clientEmailUserNumber: 0,
  clientVkUserNumber: 0,

  newAbuseReportNumber: 0,

  lastBlockingUser: null,
  lastBlockedUser: null,
  lastBlockedUserError: {},

  lastUnBlockingUser: null,
  lastUnBlockedUser: null,
  lastUnBlockedUserError: {},

  lastDeletingUser: null,
  lastDeletedUser: null,
  lastDeletedUserError: {},

  lastOpenedAbuseReport: null,
  lastReadAbuseReport: null,
  lastReadAbuseReportError: {},

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

    case actions.ADMIN_BLOCK_USER_INIT:

      return {
        ...state,
        lastBlockingUser: action.user
      };

    case actions.ADMIN_BLOCK_USER_SUCCESS:

      return {
        ...state,
        lastBlockedUser: action.user
      };

    case actions.ADMIN_BLOCK_USER_ERROR:

      return {
        ...state,
        lastBlockedUserError: action.errors
      };

    case actions.ADMIN_UNBLOCK_USER_INIT:

      return {
        ...state,
        lastUnBlockingUser: action.user
      };

    case actions.ADMIN_UNBLOCK_USER_SUCCESS:

      return {
        ...state,
        lastUnBlockedUser: action.user,
      };

    case actions.ADMIN_UNBLOCK_USER_ERROR:

      return {
        ...state,
        lastUnBlockedUserError: action.errors
      };

    case actions.ADMIN_DELETE_USER_INIT:

      return {
        ...state,
        lastDeletingUser: action.user
      };

    case actions.ADMIN_DELETE_USER_SUCCESS:

      return {
        ...state,
        lastDeletedUser: action.user
      };

    case actions.ADMIN_DELETE_USER_ERROR:

      return {
        ...state,
        lastDeletedUserError: action.errors
      };

    case actions.ADMIN_ABUSE_REPORT_OPEN:

      return {
        ...state,
        lastOpenedAbuseReport: action.report
      };

    case actions.ADMIN_ABUSE_REPORT_READ_SUCCESS:

      return {
        ...state,
        lastReadAbuseReport: action.report
      };

    case actions.ADMIN_ABUSE_REPORT_READ_ERROR:

      return {
        ...state,
      };

    default:

      return state;
  }
}
