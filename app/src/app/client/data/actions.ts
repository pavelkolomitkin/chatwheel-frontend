import { Action } from '@ngrx/store';
import {User} from "../../security/data/models/user.model";
import {AbuseReportType} from "../../core/data/models/abuse-report-type.model";

export const USER_REQUEST_UPDATE_GEOLOCATION = 'USER_REQUEST_UPDATE_GEOLOCATION';
export const USER_GEOLOCATION_PERMISSION_CHANGE = 'USER_GEOLOCATION_PERMISSION_CHANGE';

export const USER_GRAB_PICTURE_FROM_CAMERA_WINDOW = 'USER_GRAB_PICTURE_FROM_CAMERA_WINDOW';

export const USER_DELETE_ACCOUNT_START = 'USER_DELETE_ACCOUNT_START';
export const USER_DELETE_ACCOUNT_SUCCESS = 'USER_DELETE_ACCOUNT_SUCCESS';
export const USER_DELETE_ACCOUNT_ERROR = 'USER_DELETE_ACCOUNT_ERROR';

export const USER_UPDATE_NEW_MESSAGE_NUMBER_START = 'USER_UPDATE_NEW_MESSAGE_NUMBER_START';
export const USER_UPDATE_NEW_MESSAGE_NUMBER_SUCCESS = 'USER_UPDATE_NEW_MESSAGE_NUMBER_SUCCESS';
export const USER_UPDATE_NEW_MESSAGE_NUMBER_ERROR = 'USER_UPDATE_NEW_MESSAGE_NUMBER_ERROR';

export const USER_REPORT_ABUSE_INIT = 'USER_REPORT_ABUSE_INIT';
export const USER_REPORT_ABUSE_START = 'USER_REPORT_ABUSE_START';
export const USER_REPORT_ABUSE_SUCCESS = 'USER_REPORT_ABUSE_SUCCESS';
export const USER_REPORT_ABUSE_ERROR = 'USER_REPORT_ABUSE_ERROR';


export class UserRequestUpdateGeoLocation implements Action
{
  readonly type = USER_REQUEST_UPDATE_GEOLOCATION;
}

export class UserGeolocationPermissionChange implements Action
{
  readonly type = USER_GEOLOCATION_PERMISSION_CHANGE;

  constructor(public isAllowed: boolean) {
  }
}

export class UserGrabPictureFromCameraWindow implements Action
{
  readonly type = USER_GRAB_PICTURE_FROM_CAMERA_WINDOW;

  constructor(public isOpen: boolean) {}
}

export class UserDeleteAccountStart implements Action
{
  readonly type = USER_DELETE_ACCOUNT_START;
}

export class UserDeleteAccountSuccess implements Action
{
  readonly type = USER_DELETE_ACCOUNT_SUCCESS;
}

export class UserDeleteAccountError implements Action
{
  readonly type = USER_DELETE_ACCOUNT_ERROR;
}


export class UserUpdateNewMessageNumberStart implements Action
{
  readonly type = USER_UPDATE_NEW_MESSAGE_NUMBER_START;
}

export class UserUpdateNewMessageNumberSuccess implements Action
{
  readonly type = USER_UPDATE_NEW_MESSAGE_NUMBER_SUCCESS;

  constructor(public messageNumber: number) {}
}

export class UserUpdateNewMessageNumberError implements Action
{
  readonly type = USER_UPDATE_NEW_MESSAGE_NUMBER_ERROR;

  constructor(public errors: any) {}
}

export class UserReportAbuseInit implements Action
{
  readonly type = USER_REPORT_ABUSE_INIT;

  constructor(public recipient: User = null) { }
}

export class UserReportAbuseStart implements Action
{
  readonly type = USER_REPORT_ABUSE_START;

  constructor(public recipient: User, public abuseType: AbuseReportType, public comment: string = null) { }
}

export class UserReportAbuseSuccess implements Action
{
  readonly type = USER_REPORT_ABUSE_SUCCESS;

  constructor(public recipient: User) { }
}

export class UserReportAbuseError implements Action
{
  readonly type = USER_REPORT_ABUSE_ERROR;

  constructor(public errors: any) { }
}

export type ClientUserActions =
  UserRequestUpdateGeoLocation
  | UserGeolocationPermissionChange
  | UserGrabPictureFromCameraWindow

  | UserDeleteAccountStart
  | UserDeleteAccountSuccess
  | UserDeleteAccountError

  | UserUpdateNewMessageNumberStart
  | UserUpdateNewMessageNumberSuccess
  | UserUpdateNewMessageNumberError

  | UserReportAbuseInit
  | UserReportAbuseStart
  | UserReportAbuseSuccess
  | UserReportAbuseError

  ;
