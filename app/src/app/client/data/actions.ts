import { Action } from '@ngrx/store';

export const USER_REQUEST_UPDATE_GEOLOCATION = 'USER_REQUEST_UPDATE_GEOLOCATION';
export const USER_GEOLOCATION_PERMISSION_CHANGE = 'USER_GEOLOCATION_PERMISSION_CHANGE';

export const USER_GRAB_PICTURE_FROM_CAMERA_WINDOW = 'USER_GRAB_PICTURE_FROM_CAMERA_WINDOW';


export class UserRequestUpdateGeoLocation implements Action
{
  readonly type = USER_REQUEST_UPDATE_GEOLOCATION;
}

export class UserGeolocationPermissionChange implements Action
{
  readonly type = USER_GEOLOCATION_PERMISSION_CHANGE;

  constructor(public isAllowed: boolean) {
  }
}

export class UserGrabPictureFromCameraWindow implements Action
{
  readonly type = USER_GRAB_PICTURE_FROM_CAMERA_WINDOW;

  constructor(public isOpen: boolean) {}
}

export type ClientUserActions =
  UserRequestUpdateGeoLocation
  | UserGeolocationPermissionChange
  | UserGrabPictureFromCameraWindow

  ;
