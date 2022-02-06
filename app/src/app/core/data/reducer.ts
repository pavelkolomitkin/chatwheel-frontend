import * as actions from './actions';

export interface State
{
  isStoreInitialized: boolean;
  globalProgressLoaders: number;
}

export const initialState: State = {
  isStoreInitialized: false,
  globalProgressLoaders: 0,
}

export function reducer(state: State = initialState, action: actions.CoreActions): State
{
  switch (action.type) {

    case actions.GLOBAL_STORE_EFFECT_INIT:

      return {
        ...state,
        isStoreInitialized: true
      }

    case actions.GLOBAL_PROGRESS_SHOW:

      return {
        ...state,
        globalProgressLoaders: state.globalProgressLoaders + 1
      };

    case actions.GLOBAL_PROGRESS_HIDE:

      let currentGlobalLoaderNumber = state.globalProgressLoaders - 1;
      if (currentGlobalLoaderNumber < 0)
      {
        currentGlobalLoaderNumber = 0;
      }

      return {
        ...state,
        globalProgressLoaders: currentGlobalLoaderNumber
      };

    default:

      return state;
  }
}
