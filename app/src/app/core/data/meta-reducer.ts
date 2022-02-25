import {ActionReducer, INIT, MetaReducer} from "@ngrx/store";
import {GLOBAL_RESET_STATE} from "./meta-actions";

export function resetState(reducer: ActionReducer<any>): ActionReducer<any> {

  return (state, action) => {

    if (action !== null && action.type === GLOBAL_RESET_STATE)
    {
      return reducer(undefined, { type: INIT })
    }

    return reducer(state, action);
  }

}

export const metaReducers: MetaReducer[] = [resetState];
