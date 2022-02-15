import * as actions from './actions';

export interface State
{
  isGeolocationTurnedOn: boolean;
  isGrabbingPictureCameraWindowOpen: boolean;
}

export const initialState: State = {
  isGeolocationTurnedOn: false,
  isGrabbingPictureCameraWindowOpen: false,
}

export function reducer(state: State = initialState, action: actions.ClientUserActions): State
{
  switch (action.type)
  {
    case actions.USER_GEOLOCATION_PERMISSION_CHANGE:

      return {
        ...state,
        isGeolocationTurnedOn: action.isAllowed
      };

    case actions.USER_GRAB_PICTURE_FROM_CAMERA_WINDOW:

      return {
        ...state,
        isGrabbingPictureCameraWindowOpen: action.isOpen
      };

    default:

      return state;
  }
}
