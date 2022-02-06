import { Action } from '@ngrx/store';

export const GLOBAL_STORE_EFFECT_INIT = 'GLOBAL_STORE_EFFECT_INIT';

export const GLOBAL_PROGRESS_SHOW = 'GLOBAL_PROGRESS_SHOW';
export const GLOBAL_PROGRESS_HIDE = 'GLOBAL_PROGRESS_HIDE';

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



export type CoreActions = GlobalStoreEffectInit
  | GlobalProgressShow
  | GlobalProgressHide;
