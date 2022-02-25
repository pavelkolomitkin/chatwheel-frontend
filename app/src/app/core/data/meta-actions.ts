import {Action} from "@ngrx/store";


export const GLOBAL_RESET_STATE = 'GLOBAL_RESET_STATE';

export class GlobalResetState implements Action
{
  readonly type = GLOBAL_RESET_STATE;
}

export type MetaActions = GlobalResetState;
