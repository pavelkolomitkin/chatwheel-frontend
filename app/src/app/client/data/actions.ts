import { Action } from '@ngrx/store';
import {User} from "../../security/data/models/user.model";
import {AbuseReportType} from "../../core/data/models/abuse-report-type.model";
import {EditedMessage} from "./model/messages/edited-message.model";
import {RemovedMessage} from "./model/messages/removed-message.model";
import {ReceivedMessage} from "./model/messages/received-message.model";
import {ConversationMessageList} from "../../core/data/models/messages/conversation-message-list.model";

export const USER_REQUEST_UPDATE_GEOLOCATION = 'USER_REQUEST_UPDATE_GEOLOCATION';
export const USER_GEOLOCATION_PERMISSION_CHANGE = 'USER_GEOLOCATION_PERMISSION_CHANGE';

export const USER_GRAB_PICTURE_FROM_CAMERA_WINDOW = 'USER_GRAB_PICTURE_FROM_CAMERA_WINDOW';

export const USER_DELETE_ACCOUNT_START = 'USER_DELETE_ACCOUNT_START';
export const USER_DELETE_ACCOUNT_SUCCESS = 'USER_DELETE_ACCOUNT_SUCCESS';
export const USER_DELETE_ACCOUNT_ERROR = 'USER_DELETE_ACCOUNT_ERROR';

export const USER_UPDATE_NEW_MESSAGE_NUMBER_START = 'USER_UPDATE_NEW_MESSAGE_NUMBER_START';
export const USER_UPDATE_NEW_MESSAGE_NUMBER_SUCCESS = 'USER_UPDATE_NEW_MESSAGE_NUMBER_SUCCESS';
export const USER_UPDATE_NEW_MESSAGE_NUMBER_ERROR = 'USER_UPDATE_NEW_MESSAGE_NUMBER_ERROR';

export const USER_REPORT_ABUSE_INIT = 'USER_REPORT_ABUSE_INIT';
export const USER_REPORT_ABUSE_START = 'USER_REPORT_ABUSE_START';
export const USER_REPORT_ABUSE_SUCCESS = 'USER_REPORT_ABUSE_SUCCESS';
export const USER_REPORT_ABUSE_ERROR = 'USER_REPORT_ABUSE_ERROR';

export const USER_BLOCK_TOGGLE_START = 'USER_BLOCK_TOGGLE_START';
export const USER_BLOCK_TOGGLE_SUCCESS = 'USER_BLOCK_TOGGLE_SUCCESS';
export const USER_BLOCK_TOGGLE_ERROR = 'USER_BLOCK_TOGGLE_ERROR';

export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export const MESSAGE_RECEIVED_RESET = 'MESSAGE_RECEIVED_RESET';
export const MESSAGE_EDITED = 'MESSAGE_EDITED';
export const MESSAGE_EDITED_RESET = 'MESSAGE_EDITED_RESET';
export const MESSAGE_REMOVED = 'MESSAGE_REMOVED';
export const MESSAGE_REMOVED_RESET = 'MESSAGE_REMOVED_RESET';

export const MESSAGE_ACTION_STATE_RESET = 'MESSAGE_ACTION_STATE_RESET';

export const USER_BANNED_ME = 'USER_BANNED_ME';
export const USER_UNBANNED_ME = 'USER_UNBANNED_ME';
export const I_BANNED_USER = 'I_BANNED_USER';
export const I_UNBANNED_USER = 'I_UNBANNED_USER';

export const CONVERSATION_OPEN = 'CONVERSATION_OPEN';
export const CONVERSATION_CLOSE = 'CONVERSATION_CLOSE';


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

export class UserDeleteAccountStart implements Action
{
  readonly type = USER_DELETE_ACCOUNT_START;
}

export class UserDeleteAccountSuccess implements Action
{
  readonly type = USER_DELETE_ACCOUNT_SUCCESS;
}

export class UserDeleteAccountError implements Action
{
  readonly type = USER_DELETE_ACCOUNT_ERROR;
}


export class UserUpdateNewMessageNumberStart implements Action
{
  readonly type = USER_UPDATE_NEW_MESSAGE_NUMBER_START;
}

export class UserUpdateNewMessageNumberSuccess implements Action
{
  readonly type = USER_UPDATE_NEW_MESSAGE_NUMBER_SUCCESS;

  constructor(public messageNumber: number) {}
}

export class UserUpdateNewMessageNumberError implements Action
{
  readonly type = USER_UPDATE_NEW_MESSAGE_NUMBER_ERROR;

  constructor(public errors: any) {}
}

export class UserReportAbuseInit implements Action
{
  readonly type = USER_REPORT_ABUSE_INIT;

  constructor(public recipient: User = null) { }
}

export class UserReportAbuseStart implements Action
{
  readonly type = USER_REPORT_ABUSE_START;

  constructor(public recipient: User, public abuseType: AbuseReportType, public comment: string = null) { }
}

export class UserReportAbuseSuccess implements Action
{
  readonly type = USER_REPORT_ABUSE_SUCCESS;

  constructor(public recipient: User) { }
}

export class UserReportAbuseError implements Action
{
  readonly type = USER_REPORT_ABUSE_ERROR;

  constructor(public errors: any) { }
}

export class UserBlockToggleStart implements Action
{
  readonly type = USER_BLOCK_TOGGLE_START;

  constructor(public user: User, public block: boolean) {}
}

export class UserBlockToggleSuccess implements Action
{
  readonly type = USER_BLOCK_TOGGLE_SUCCESS;

  constructor(public user: User) { }
}

export class UserBlockToggleError implements Action
{
  readonly type = USER_BLOCK_TOGGLE_ERROR;

  constructor(public errors: any) { }
}

export class MessageReceived implements Action
{
  readonly type = MESSAGE_RECEIVED;

  constructor(public message: ReceivedMessage) {}
}

export class MessageReceivedReset implements Action
{
  readonly type = MESSAGE_RECEIVED_RESET;
}

export class MessageEdited implements Action
{
  readonly type = MESSAGE_EDITED;

  constructor(public message: EditedMessage) {}
}

export class MessageEditedReset implements Action
{
  readonly type = MESSAGE_EDITED_RESET;
}

export class MessageRemoved implements Action
{
  readonly type = MESSAGE_REMOVED;

  constructor(public message: RemovedMessage) {}
}

export class MessageRemovedReset implements Action
{
  readonly type = MESSAGE_REMOVED_RESET;
}

export class MessageActionStateReset implements Action
{
  readonly type = MESSAGE_ACTION_STATE_RESET;
}

export class UserBannedMe implements Action
{
  readonly type = USER_BANNED_ME;

  constructor(public user: User) { }
}

export class UserUnbannedMe implements Action
{
  readonly type = USER_UNBANNED_ME;

  constructor(public user: User) { }
}

export class IBannedUser implements Action
{
  readonly type = I_BANNED_USER;

  constructor(public user: User) { }
}

export class IUnbannedUser implements Action
{
  readonly type = I_UNBANNED_USER;

  constructor(public user: User) { }
}

export class ConversationOpen implements Action
{
  readonly type = CONVERSATION_OPEN;

  constructor(public conversation: ConversationMessageList) { }
}

export class ConversationClose implements Action
{
  readonly type = CONVERSATION_CLOSE;
}

export type ClientUserActions =
  UserRequestUpdateGeoLocation
  | UserGeolocationPermissionChange
  | UserGrabPictureFromCameraWindow

  | UserDeleteAccountStart
  | UserDeleteAccountSuccess
  | UserDeleteAccountError

  | UserUpdateNewMessageNumberStart
  | UserUpdateNewMessageNumberSuccess
  | UserUpdateNewMessageNumberError

  | UserReportAbuseInit
  | UserReportAbuseStart
  | UserReportAbuseSuccess
  | UserReportAbuseError

  | UserBlockToggleStart
  | UserBlockToggleSuccess
  | UserBlockToggleError

  | MessageReceived
  | MessageReceivedReset
  | MessageEdited
  | MessageEditedReset
  | MessageRemoved
  | MessageRemovedReset
  | MessageActionStateReset

  | UserBannedMe
  | UserUnbannedMe
  | IBannedUser
  | IUnbannedUser

  | ConversationOpen
  | ConversationClose


  ;
