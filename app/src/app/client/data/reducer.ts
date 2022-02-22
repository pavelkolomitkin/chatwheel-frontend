import * as actions from './actions';
import {User} from "../../security/data/models/user.model";

export interface State
{
  isGeolocationTurnedOn: boolean;
  isGrabbingPictureCameraWindowOpen: boolean;

  newMessageNumber: number;

  abuseReportRecipient: User;
  reportAbuseErrors: any;

  lastReportedUser: User;
}

export const initialState: State = {
  isGeolocationTurnedOn: false,
  isGrabbingPictureCameraWindowOpen: false,

  newMessageNumber: 0,

  abuseReportRecipient: null,
  reportAbuseErrors: {},

  lastReportedUser: null,
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

    case actions.USER_UPDATE_NEW_MESSAGE_NUMBER_SUCCESS:

      return {
        ...state,
        newMessageNumber: action.messageNumber
      };

    case actions.USER_UPDATE_NEW_MESSAGE_NUMBER_ERROR:

      return {
        ...state,
        newMessageNumber: 0
      };


    case actions.USER_REPORT_ABUSE_INIT:

      return {
        ...state,
        abuseReportRecipient: action.recipient
      };

    case actions.USER_REPORT_ABUSE_START:

      return {
        ...state,
        abuseReportRecipient: action.recipient
      };

    case actions.USER_REPORT_ABUSE_SUCCESS:

      return {
        ...state,
        abuseReportRecipient: null,
        lastReportedUser: action.recipient
      };

    case actions.USER_REPORT_ABUSE_ERROR:

      return {
        ...state,
        abuseReportRecipient: null,
        reportAbuseErrors: action.errors
      };

    default:

      return state;
  }
}
