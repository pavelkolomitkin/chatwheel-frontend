import * as actions from './actions';
import {Notification} from "./models/notification.model";
import {Country} from "./models/country.model";
import {UploadFile} from "./models/upload-file.model";
import {GLOBAL_WINDOW_FOCUS_CHANGE} from "./actions";

export interface State
{
  isStoreInitialized: boolean;
  globalProgressLoaders: number;
  lastNotification: Notification;
  countries: Country[];
  countriesLoadError: {},

  uploadingUserPicture: UploadFile;
  uploadedUserPicture: UploadFile;
  uploadingUserPictureErrors: {};

  isGrabbingPictureCameraWindowOpen: boolean;

  isWindowFocused: boolean;
  windowTitleFlashMessage: string;
}

export const initialState: State = {
  isStoreInitialized: false,
  globalProgressLoaders: 0,
  lastNotification: null,

  countries: [],
  countriesLoadError: {},

  uploadingUserPicture: null,
  uploadedUserPicture: null,
  uploadingUserPictureErrors: null,
  isGrabbingPictureCameraWindowOpen: false,

  isWindowFocused: true,
  windowTitleFlashMessage: null
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

    case actions.GLOBAL_NOTIFICATION:

      return {
        ...state,
        lastNotification: action.notification
      };

    case actions.COUNTRY_LIST_LOADED:

      return {
        ...state,
        countries: action.list
      };

    case actions.COUNTRY_LIST_LOAD_ERROR:

      return {
        ...state,
        countriesLoadError: action.errors
      };

    case actions.UPLOAD_USER_AVATAR_COMPLETE:

      return {
        ...state,
        uploadedUserPicture: action.item
      };

    case actions.UPLOAD_USER_AVATAR_ERROR:

      return {
        ...state,
        uploadingUserPictureErrors: action.errors
      };

    case actions.USER_GRAB_PICTURE_FROM_CAMERA_WINDOW:

      return {
        ...state,
        isGrabbingPictureCameraWindowOpen: action.isOpen
      };


    case actions.GLOBAL_WINDOW_FOCUS_CHANGE:

      return {
        ...state,
        isWindowFocused: action.isFocused
      };

    case actions.GLOBAL_SET_WINDOW_TITLE_MESSAGE:

      return {
        ...state,
        windowTitleFlashMessage: action.message
      };

    default:

      return state;
  }
}
