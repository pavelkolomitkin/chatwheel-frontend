import { Action } from '@ngrx/store';
import {User} from "../../security/data/models/user.model";
import {AbuseReport} from "../../core/data/models/abuse-report.model";
import {AbuseReportType} from "../../core/data/models/abuse-report-type.model";

export const ADMIN_GET_ABUSE_REPORT_TYPES_START = 'ADMIN_GET_ABUSE_REPORT_TYPES_START';
export const ADMIN_GET_ABUSE_REPORT_TYPES_SUCCESS = 'ADMIN_GET_ABUSE_REPORT_TYPES_SUCCESS';
export const ADMIN_GET_ABUSE_REPORT_TYPES_ERROR = 'ADMIN_GET_ABUSE_REPORT_TYPES_ERROR';

export const ADMIN_GET_ABUSE_REPORT_NUMBERS = 'ADMIN_GET_ABUSE_REPORT_NUMBERS';
export const ADMIN_GET_ABUSE_REPORT_NUMBERS_SUCCESS = 'ADMIN_GET_ABUSE_REPORT_NUMBERS_SUCCESS';

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

export const ADMIN_ABUSE_REPORT_OPEN = 'ADMIN_ABUSE_REPORT_OPEN';

export const ADMIN_ABUSE_REPORT_READ = 'ADMIN_ABUSE_REPORT_READ';
export const ADMIN_ABUSE_REPORT_READ_SUCCESS = 'ADMIN_ABUSE_REPORT_READ_SUCCESS';
export const ADMIN_ABUSE_REPORT_READ_ERROR = 'ADMIN_ABUSE_REPORT_READ_ERROR';

export const ADMIN_GET_TOTAL_NUMBER_ADMIN_USERS = 'ADMIN_GET_TOTAL_NUMBER_ADMIN_USERS';
export const ADMIN_GET_TOTAL_NUMBER_ADMIN_USERS_SUCCESS = 'ADMIN_GET_TOTAL_NUMBER_ADMIN_USERS_SUCCESS';
export const ADMIN_GET_TOTAL_NUMBER_ADMIN_USERS_ERROR = 'ADMIN_GET_TOTAL_NUMBER_ADMIN_USERS_ERROR';

export const ADMIN_CREATE_ADMIN_USER_INIT = 'ADMIN_CREATE_ADMIN_USER_INIT';
export const ADMIN_ADMIN_USER_CREATED = 'ADMIN_ADMIN_USER_CREATED';

export const ADMIN_EDIT_ADMIN_USER_INIT = 'ADMIN_EDIT_ADMIN_USER_INIT';
export const ADMIN_ADMIN_USER_EDITED = 'ADMIN_ADMIN_USER_EDITED';

export const ADMIN_RESET_PASSWORD_ADMIN_USER_INIT = 'ADMIN_RESET_PASSWORD_ADMIN_USER_INIT';
export const ADMIN_ADMIN_USER_PASSWORD_RESET = 'ADMIN_ADMIN_USER_PASSWORD_RESET';

export const ADMIN_BLOCK_ADMIN_USER_INIT = 'ADMIN_BLOCK_ADMIN_USER_INIT';
export const ADMIN_ADMIN_USER_BLOCKED = 'ADMIN_ADMIN_USER_BLOCKED';

export const ADMIN_UNBLOCK_ADMIN_USER_INIT = 'ADMIN_UNBLOCK_ADMIN_USER_INIT';
export const ADMIN_ADMIN_USER_UNBLOCKED = 'ADMIN_ADMIN_USER_UNBLOCKED';

export const ADMIN_DELETE_ADMIN_USER_INIT = 'ADMIN_DELETE_ADMIN_USER_INIT';
export const ADMIN_ADMIN_USER_DELETED = 'ADMIN_ADMIN_USER_DELETED';

export const ADMIN_GET_USER_NUMBER = 'ADMIN_GET_USER_NUMBER';
export const ADMIN_GET_USER_NUMBER_SUCCESS = 'ADMIN_GET_USER_NUMBER_SUCCESS';

export class GetAbuseReportTypesStart implements Action
{
  readonly type = ADMIN_GET_ABUSE_REPORT_TYPES_START;
}

export class GetAbuseReportTypesSuccess implements Action
{
  readonly type = ADMIN_GET_ABUSE_REPORT_TYPES_SUCCESS;

  constructor(public types: AbuseReportType[]) {}
}

export class GetAbuseReportTypesError implements Action
{
  readonly type = ADMIN_GET_ABUSE_REPORT_TYPES_ERROR;

  constructor(public errors: any) { }
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


export class AbuseReportOpen implements Action
{
  readonly type = ADMIN_ABUSE_REPORT_OPEN;

  constructor(public report: AbuseReport) {}
}


export class AbuseReportRead implements Action
{
  readonly type = ADMIN_ABUSE_REPORT_READ;

  constructor(public report: AbuseReport) {  }
}

export class AbuseReportReadSuccess implements Action
{
  readonly type = ADMIN_ABUSE_REPORT_READ_SUCCESS;

  constructor(public report: AbuseReport) {  }
}

export class AbuseReportReadError implements Action
{
  readonly type = ADMIN_ABUSE_REPORT_READ_ERROR;

  constructor(public errors: any) { }
}


export class GetTotalNumberAdminUsers implements Action
{
  readonly type = ADMIN_GET_TOTAL_NUMBER_ADMIN_USERS;

  constructor() { }
}

export class GetTotalNumberAdminUsersSuccess implements Action
{
  readonly type = ADMIN_GET_TOTAL_NUMBER_ADMIN_USERS_SUCCESS;

  constructor(public totalNumber: number) {  }
}

export class GetTotalNumberAdminUsersError implements Action
{
  readonly type = ADMIN_GET_TOTAL_NUMBER_ADMIN_USERS_ERROR;

  constructor(public errors: any) { }
}


export class CreateAdminUserInit implements Action
{
  readonly type = ADMIN_CREATE_ADMIN_USER_INIT;

  constructor(public init: boolean) {}
}

export class AdminUserCreated implements Action
{
  readonly type = ADMIN_ADMIN_USER_CREATED;

  constructor(public admin: User) {  }
}


export class EditAdminUserInit implements Action
{
  readonly type = ADMIN_EDIT_ADMIN_USER_INIT;

  constructor(public admin: User) {  }
}

export class AdminUserEdited implements Action
{
  readonly type = ADMIN_ADMIN_USER_EDITED;

  constructor(public admin: User) {  }
}


export class ResetPasswordAdminUserInit implements Action
{
  readonly type = ADMIN_RESET_PASSWORD_ADMIN_USER_INIT;

  constructor(public admin: User) {  }
}

export class AdminUserPasswordReset implements Action
{
  readonly type = ADMIN_ADMIN_USER_PASSWORD_RESET;

  constructor(public admin: User) {  }
}


export class BlockAdminUserInit implements Action
{
  readonly type = ADMIN_BLOCK_ADMIN_USER_INIT;

  constructor(public admin: User) { }
}

export class AdminUserBlocked implements Action
{
  readonly type = ADMIN_ADMIN_USER_BLOCKED;

  constructor(public admin: User) { }
}

export class UnBlockAdminUserInit implements Action
{
  readonly type = ADMIN_UNBLOCK_ADMIN_USER_INIT;

  constructor(public admin: User) { }
}

export class AdminUserUnBlocked implements Action
{
  readonly type = ADMIN_ADMIN_USER_UNBLOCKED;

  constructor(public admin: User) { }
}

export class DeleteAdminUserInit implements Action
{
  readonly type = ADMIN_DELETE_ADMIN_USER_INIT;

  constructor(public admin: User) { }
}

export class AdminUserDeleted implements Action
{
  readonly type = ADMIN_ADMIN_USER_DELETED;

  constructor(public admin: User) { }
}


export class GetClientUserNumber implements Action
{
  readonly type = ADMIN_GET_USER_NUMBER;

}

export class GetClientUserNumberSuccess implements Action
{
  readonly type = ADMIN_GET_USER_NUMBER_SUCCESS;

  constructor(
    public total: number, public emailNumber: number, public vkNumber: number
  ) {
  }
}


export class GetAbuseReportNumbers implements Action
{
  readonly type = ADMIN_GET_ABUSE_REPORT_NUMBERS;
}

export class GetAbuseReportNumbersSuccess implements Action
{
  readonly type = ADMIN_GET_ABUSE_REPORT_NUMBERS_SUCCESS;

  constructor(public totalNumber: number, public newNumber: number) { }
}

export type AdminUserActions =
  GetAbuseReportNumbers
  | GetAbuseReportNumbersSuccess
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

  | AbuseReportOpen

  | AbuseReportRead
  | AbuseReportReadSuccess
  | AbuseReportReadError

  | GetTotalNumberAdminUsers
  | GetTotalNumberAdminUsersSuccess
  | GetTotalNumberAdminUsersError

  | CreateAdminUserInit
  | AdminUserCreated

  | EditAdminUserInit
  | AdminUserEdited

  | ResetPasswordAdminUserInit
  | AdminUserPasswordReset

  | BlockAdminUserInit
  | AdminUserBlocked
  | UnBlockAdminUserInit
  | AdminUserUnBlocked
  | DeleteAdminUserInit
  | AdminUserDeleted

  | GetAbuseReportTypesStart
  | GetAbuseReportTypesSuccess
  | GetAbuseReportTypesError

  | GetClientUserNumber
  | GetClientUserNumberSuccess
  ;
