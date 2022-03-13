import { Action } from '@ngrx/store';
import {AuthUserTypes} from "./model/user-types.enum";

export const ADMIN_GET_TOTAL_NUMBER_CLIENT_USERS_START = 'ADMIN_GET_TOTAL_NUMBER_CLIENT_USERS_START'
export const ADMIN_GET_TOTAL_NUMBER_CLIENT_USERS_SUCCESS = 'ADMIN_GET_TOTAL_NUMBER_CLIENT_USERS_SUCCESS'
export const ADMIN_GET_TOTAL_NUMBER_CLIENT_USERS_ERROR = 'ADMIN_GET_TOTAL_NUMBER_CLIENT_USERS_ERROR'

export const ADMIN_GET_NEW_ABUSE_REPORT_NUMBER_START = 'ADMIN_GET_NEW_ABUSE_REPORT_NUMBER_START';
export const ADMIN_GET_NEW_ABUSE_REPORT_NUMBER_SUCCESS = 'ADMIN_GET_NEW_ABUSE_REPORT_NUMBER_SUCCESS';
export const ADMIN_GET_NEW_ABUSE_REPORT_NUMBER_ERROR = 'ADMIN_GET_NEW_ABUSE_REPORT_NUMBER_ERROR';

export class GetTotalNumberClientUsersStart implements Action
{
  readonly type = ADMIN_GET_TOTAL_NUMBER_CLIENT_USERS_START;

  constructor(public authType: AuthUserTypes = null) {}
}

export class GetTotalNumberClientUsersSuccess implements Action
{
  readonly type = ADMIN_GET_TOTAL_NUMBER_CLIENT_USERS_SUCCESS

  constructor(public value: number, public authType: AuthUserTypes = null) {}
}

export class GetTotalNumberClientUsersError implements Action
{
  readonly type = ADMIN_GET_TOTAL_NUMBER_CLIENT_USERS_ERROR;

  constructor(public errors: any, public authType: AuthUserTypes = null) {}
}


export class GetNewAbuseReportNumberStart implements Action
{
  readonly type = ADMIN_GET_NEW_ABUSE_REPORT_NUMBER_START;
}

export class GetNewAbuseReportNumberSuccess implements Action
{
  readonly type = ADMIN_GET_NEW_ABUSE_REPORT_NUMBER_SUCCESS;

  constructor(public value: number) {}
}

export class GetNewAbuseReportNumberError implements Action
{
  readonly type = ADMIN_GET_NEW_ABUSE_REPORT_NUMBER_ERROR;

  constructor(public errors: any) {}
}


export type AdminUserActions =
  GetTotalNumberClientUsersStart
  | GetTotalNumberClientUsersSuccess
  | GetTotalNumberClientUsersError

  | GetNewAbuseReportNumberStart
  | GetNewAbuseReportNumberSuccess
  | GetNewAbuseReportNumberError

  ;
