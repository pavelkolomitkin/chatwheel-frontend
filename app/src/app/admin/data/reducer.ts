import * as actions from './actions';
import {User} from "../../security/data/models/user.model";
import {AbuseReport} from "../../core/data/models/abuse-report.model";
import {AbuseReportType} from "../../core/data/models/abuse-report-type.model";


export interface State
{
  totalClientUserNumber: number,
  emailClientUserNumber: number,
  vkUserNumber: number,

  abuseReportTypes: AbuseReportType[],

  totalAbuseReportNumber: number,
  newAbuseReportNumber: number,

  adminTotalNumber: number,

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

  createAdminInit: boolean,
  lastCreatedAdminUser: User,

  editingAdmin: User,
  lastEditedAdminUser: User,

  resettingPasswordAdmin: User,
  lastPasswordResetAdminUser: User,

  blockingAdmin: User,
  lastBlockedAdmin: User,

  unBlockingAdmin: User,
  lastUnBlockedAdmin: User,

  deletingAdmin: User,
  lastDeletedAdmin: User,
}

export const initialState: State = {

  totalClientUserNumber: null,
  emailClientUserNumber: null,
  vkUserNumber: null,

  abuseReportTypes: [],

  totalAbuseReportNumber: null,
  newAbuseReportNumber: null,

  adminTotalNumber: 0,

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

  createAdminInit: false,
  lastCreatedAdminUser: null,

  editingAdmin: null,
  lastEditedAdminUser: null,

  resettingPasswordAdmin: null,
  lastPasswordResetAdminUser: null,

  blockingAdmin: null,
  lastBlockedAdmin: null,

  unBlockingAdmin: null,
  lastUnBlockedAdmin: null,

  deletingAdmin: null,
  lastDeletedAdmin: null

}

export function reducer(state: State = initialState, action: actions.AdminUserActions): State
{
  switch (action.type)
  {
    case actions.ADMIN_GET_ABUSE_REPORT_NUMBERS_SUCCESS:

      return {
        ...state,
        totalAbuseReportNumber: action.totalNumber,
        newAbuseReportNumber: action.newNumber
      };

    case actions.ADMIN_GET_ABUSE_REPORT_TYPES_SUCCESS:

      return {
        ...state,
        abuseReportTypes: action.types
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
        lastReadAbuseReportError: action.errors
      };

    case actions.ADMIN_GET_TOTAL_NUMBER_ADMIN_USERS_SUCCESS:

      return {
        ...state,
        adminTotalNumber: action.totalNumber
      };

    case actions.ADMIN_CREATE_ADMIN_USER_INIT:

      return {
        ...state,
        createAdminInit: action.init
      };

    case actions.ADMIN_ADMIN_USER_CREATED:

      return {
        ...state,
        lastCreatedAdminUser: action.admin
      };

    case actions.ADMIN_EDIT_ADMIN_USER_INIT:

      return {
        ...state,
        editingAdmin: action.admin
      };

    case actions.ADMIN_ADMIN_USER_EDITED:

      return {
        ...state,
        lastEditedAdminUser: action.admin
      };

    case actions.ADMIN_RESET_PASSWORD_ADMIN_USER_INIT:

      return {
        ...state,
        resettingPasswordAdmin: action.admin
      };

    case actions.ADMIN_ADMIN_USER_PASSWORD_RESET:

      return {
        ...state,
        lastPasswordResetAdminUser: action.admin
      };

    case actions.ADMIN_BLOCK_ADMIN_USER_INIT:

      return {
        ...state,
        blockingAdmin: action.admin
      };

    case actions.ADMIN_ADMIN_USER_BLOCKED:

      return {
        ...state,
        lastBlockedAdmin: action.admin
      };

    case actions.ADMIN_UNBLOCK_ADMIN_USER_INIT:

      return {
        ...state,
        unBlockingAdmin: action.admin
      };


    case actions.ADMIN_ADMIN_USER_UNBLOCKED:

      return {
        ...state,
        lastUnBlockedAdmin: action.admin
      };

    case actions.ADMIN_DELETE_ADMIN_USER_INIT:

      return {
        ...state,
        deletingAdmin: action.admin
      }

    case actions.ADMIN_ADMIN_USER_DELETED:

      return {
        ...state,
        lastDeletedAdmin: action.admin
      };

    case actions.ADMIN_GET_USER_NUMBER_SUCCESS:

      return {
        ...state,
        totalClientUserNumber: action.total,
        emailClientUserNumber: action.emailNumber,
        vkUserNumber: action.vkNumber
      };

    default:

      return state;
  }
}
