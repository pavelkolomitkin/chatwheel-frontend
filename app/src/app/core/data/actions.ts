import { Action } from '@ngrx/store';
import {Notification} from "./models/notification.model";
import {Country} from "./models/country.model";
import {UploadFile} from "./models/upload-file.model";

export const GLOBAL_STORE_EFFECT_INIT = 'GLOBAL_STORE_EFFECT_INIT';

export const GLOBAL_PROGRESS_SHOW = 'GLOBAL_PROGRESS_SHOW';
export const GLOBAL_PROGRESS_HIDE = 'GLOBAL_PROGRESS_HIDE';

export const GLOBAL_NOTIFICATION = 'GLOBAL_NOTIFICATION';

export const COUNTRY_LIST_LOADED = 'COUNTRY_LIST_LOADED';

export const UPLOAD_USER_AVATAR_START = 'UPLOAD_USER_AVATAR_START';
export const UPLOAD_USER_AVATAR_COMPLETE = 'UPLOAD_USER_AVATAR_COMPLETE';
export const UPLOAD_USER_AVATAR_ERROR = 'UPLOAD_USER_AVATAR_ERROR';

export const REMOVE_USER_AVATAR_START = 'REMOVE_USER_AVATAR_START';
export const REMOVE_USER_AVATAR_ERROR = 'REMOVE_USER_AVATAR_ERROR';


export class GlobalStoreEffectInit implements Action
{
  readonly type = GLOBAL_STORE_EFFECT_INIT;
}

export class GlobalProgressShow implements Action
{
  readonly type = GLOBAL_PROGRESS_SHOW;
}

export class GlobalProgressHide implements Action
{
  readonly  type = GLOBAL_PROGRESS_HIDE;
}

export class GlobalNotification implements Action
{
  readonly type = GLOBAL_NOTIFICATION;

  constructor(public notification: Notification) {}
}

export class CountryListLoaded implements Action
{
  readonly type = COUNTRY_LIST_LOADED;

  constructor(public list: Country[]) {}
}

export class UploadUserAvatarStart implements Action
{
  readonly type = UPLOAD_USER_AVATAR_START;

  constructor(public item: UploadFile) {}
}

export class UploadUserAvatarComplete implements Action
{
  readonly type = UPLOAD_USER_AVATAR_COMPLETE;

  constructor(public item: UploadFile) {}
}

export class UploadUserAvatarError implements Action
{
  readonly type = UPLOAD_USER_AVATAR_ERROR;

  constructor(public item: UploadFile, public errors: Object) { }
}

export class RemoveUserAvatarStart implements Action
{
  readonly type = REMOVE_USER_AVATAR_START;
}

export class RemoveUserAvatarError implements Action
{
  readonly type = REMOVE_USER_AVATAR_ERROR;
}

export type CoreActions = GlobalStoreEffectInit
  | GlobalProgressShow
  | GlobalProgressHide
  | GlobalNotification

  | CountryListLoaded

  | UploadUserAvatarStart
  | UploadUserAvatarComplete
  | UploadUserAvatarError

  | RemoveUserAvatarStart
  | RemoveUserAvatarError
  ;
