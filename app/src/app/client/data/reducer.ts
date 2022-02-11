import * as actions from './actions';

export interface State
{
  isGeolocationTurnedOn: boolean;
}

export const initialState: State = {
  isGeolocationTurnedOn: false
}

export function reducer(state: State = initialState, action: actions.ClientUserActions): State
{
  switch (action.type)
  {
    case actions.USER_GEOLOCATION_PERMISSION_CHANGE:

      return {
        isGeolocationTurnedOn: action.isAllowed
      };

    default:

      return state;
  }
}
