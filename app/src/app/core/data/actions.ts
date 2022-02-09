import { Action } from '@ngrx/store';
import {Notification} from "./models/notification.model";
import {Country} from "./models/country.model";

export const GLOBAL_STORE_EFFECT_INIT = 'GLOBAL_STORE_EFFECT_INIT';

export const GLOBAL_PROGRESS_SHOW = 'GLOBAL_PROGRESS_SHOW';
export const GLOBAL_PROGRESS_HIDE = 'GLOBAL_PROGRESS_HIDE';

export const GLOBAL_NOTIFICATION = 'GLOBAL_NOTIFICATION';

export const COUNTRY_LIST_LOADED = 'COUNTRY_LIST_LOADED';


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

export type CoreActions = GlobalStoreEffectInit
  | GlobalProgressShow
  | GlobalProgressHide
  | GlobalNotification

  | CountryListLoaded
  ;
