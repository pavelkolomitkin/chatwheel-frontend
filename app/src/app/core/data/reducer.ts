import * as actions from './actions';
import {Notification} from "./models/notification.model";
import {Country} from "./models/country.model";
import {UploadFile} from "./models/upload-file.model";

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

    default:

      return state;
  }
}
