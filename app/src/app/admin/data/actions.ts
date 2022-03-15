import { Action } from '@ngrx/store';
import {AuthUserTypes} from "./model/auth-user-types.enum";
import {User} from "../../security/data/models/user.model";

export const ADMIN_GET_TOTAL_NUMBER_CLIENT_USERS_START = 'ADMIN_GET_TOTAL_NUMBER_CLIENT_USERS_START'
export const ADMIN_GET_TOTAL_NUMBER_CLIENT_USERS_SUCCESS = 'ADMIN_GET_TOTAL_NUMBER_CLIENT_USERS_SUCCESS'
export const ADMIN_GET_TOTAL_NUMBER_CLIENT_USERS_ERROR = 'ADMIN_GET_TOTAL_NUMBER_CLIENT_USERS_ERROR'

export const ADMIN_GET_NEW_ABUSE_REPORT_NUMBER_START = 'ADMIN_GET_NEW_ABUSE_REPORT_NUMBER_START';
export const ADMIN_GET_NEW_ABUSE_REPORT_NUMBER_SUCCESS = 'ADMIN_GET_NEW_ABUSE_REPORT_NUMBER_SUCCESS';
export const ADMIN_GET_NEW_ABUSE_REPORT_NUMBER_ERROR = 'ADMIN_GET_NEW_ABUSE_REPORT_NUMBER_ERROR';

export const ADMIN_BLOCK_USER_INIT = 'ADMIN_BLOCK_USER_INIT';
export const ADMIN_BLOCK_USER_START = 'ADMIN_BLOCK_USER_START';
export const ADMIN_BLOCK_USER_SUCCESS = 'ADMIN_BLOCK_USER_SUCCESS';
export const ADMIN_BLOCK_USER_ERROR = 'ADMIN_BLOCK_USER_ERROR';

export const ADMIN_UNBLOCK_USER_INIT = 'ADMIN_UNBLOCK_USER_INIT';
export const ADMIN_UNBLOCK_USER_START = 'ADMIN_UNBLOCK_USER_START';
export const ADMIN_UNBLOCK_USER_SUCCESS = 'ADMIN_UNBLOCK_USER_SUCCESS';
export const ADMIN_UNBLOCK_USER_ERROR = 'ADMIN_UNBLOCK_USER_ERROR';

export const ADMIN_DELETE_USER_INIT = 'ADMIN_DELETE_USER_INIT';
export const ADMIN_DELETE_USER_START = 'ADMIN_DELETE_USER_START';
export const ADMIN_DELETE_USER_SUCCESS = 'ADMIN_DELETE_USER_SUCCESS';
export const ADMIN_DELETE_USER_ERROR = 'ADMIN_DELETE_USER_ERROR';



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


export class BlockUserInit implements Action
{
  readonly type = ADMIN_BLOCK_USER_INIT;

  constructor(public user: User) {}
}

export class BlockUserStart implements Action
{
  readonly type = ADMIN_BLOCK_USER_START;

  constructor(public user: User, public reason: string = null) {  }
}

export class BlockUserSuccess implements Action
{
  readonly type = ADMIN_BLOCK_USER_SUCCESS;

  constructor(public user: User) {  }
}

export class BlockUserError implements Action
{
  readonly type = ADMIN_BLOCK_USER_ERROR;

  constructor(public user: User, public errors: any) {  }
}



export class UnBlockUserInit implements Action
{
  readonly type = ADMIN_UNBLOCK_USER_INIT;

  constructor(public user: User) {}
}

export class UnBlockUserStart implements Action
{
  readonly type = ADMIN_UNBLOCK_USER_START;

  constructor(public user: User) {  }
}

export class UnBlockUserSuccess implements Action
{
  readonly type = ADMIN_UNBLOCK_USER_SUCCESS;

  constructor(public user: User) {  }
}

export class UnBlockUserError implements Action
{
  readonly type = ADMIN_UNBLOCK_USER_ERROR;

  constructor(public user: User, public errors: any) {  }
}


export class DeleteUserInit implements Action
{
  readonly type = ADMIN_DELETE_USER_INIT;

  constructor(public user: User) {  }
}

export class DeleteUserStart implements Action
{
  readonly type = ADMIN_DELETE_USER_START;

  constructor(public user: User) {  }
}

export class DeleteUserSuccess implements Action
{
  readonly type = ADMIN_DELETE_USER_SUCCESS;

  constructor(public user: User) {  }
}

export class DeleteUserError implements Action
{
  readonly type = ADMIN_DELETE_USER_ERROR;

  constructor(public user: User, public errors: any) {  }
}


export type AdminUserActions =
  GetTotalNumberClientUsersStart
  | GetTotalNumberClientUsersSuccess
  | GetTotalNumberClientUsersError

  | GetNewAbuseReportNumberStart
  | GetNewAbuseReportNumberSuccess
  | GetNewAbuseReportNumberError

  | BlockUserInit
  | BlockUserStart
  | BlockUserSuccess
  | BlockUserError

  | UnBlockUserInit
  | UnBlockUserStart
  | UnBlockUserSuccess
  | UnBlockUserError

  | DeleteUserInit
  | DeleteUserStart
  | DeleteUserSuccess
  | DeleteUserError

  ;
