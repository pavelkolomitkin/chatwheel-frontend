import * as actions from './actions';
import {User} from "../../security/data/models/user.model";
import {EditedMessage} from "./model/messages/edited-message.model";
import {RemovedMessage} from "./model/messages/removed-message.model";
import {ReceivedMessage} from "./model/messages/received-message.model";
import {ConversationMessageList} from "../../core/data/models/messages/conversation-message-list.model";

export interface State
{
  isGeolocationTurnedOn: boolean;
  isGrabbingPictureCameraWindowOpen: boolean;

  newMessageNumber: number;

  abuseReportRecipient: User;
  reportAbuseErrors: any;

  lastReportedUser: User;

  lastBanStatusChangedUser: User;

  lastReceivedMessage: ReceivedMessage;

  lastEditedMessage: EditedMessage;
  lastRemovedMessage: RemovedMessage;

  lastUserBannedMe: User;
  lastUserUnbannedMe: User;

  lastUserIBanned: User;
  lastUserIUnBanned: User;

  openedConversation: ConversationMessageList;
}

export const initialState: State = {
  isGeolocationTurnedOn: false,
  isGrabbingPictureCameraWindowOpen: false,

  newMessageNumber: 0,

  abuseReportRecipient: null,
  reportAbuseErrors: {},

  lastReportedUser: null,

  lastBanStatusChangedUser: null,

  lastReceivedMessage: null,

  lastEditedMessage: null,
  lastRemovedMessage: null,

  lastUserBannedMe: null,
  lastUserUnbannedMe: null,

  lastUserIBanned: null,
  lastUserIUnBanned: null,

  openedConversation: null,
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
        lastReportedUser: action.recipient,
        lastBanStatusChangedUser: action.recipient
      };

    case actions.USER_REPORT_ABUSE_ERROR:

      return {
        ...state,
        abuseReportRecipient: null,
        reportAbuseErrors: action.errors
      };

    case actions.USER_BLOCK_TOGGLE_SUCCESS:

      return {
        ...state,
        lastBanStatusChangedUser: action.user
      };

    case actions.USER_BLOCK_TOGGLE_ERROR:

      return {
        ...state,
        lastBanStatusChangedUser: null
      };

    case actions.MESSAGE_RECEIVED:

      return {
        ...state,
        lastReceivedMessage: action.message,
      };

    case actions.MESSAGE_RECEIVED_RESET:

      return {
        ...state,
        lastReceivedMessage: null
      };

    case actions.MESSAGE_EDITED:

      return {
        ...state,
        lastEditedMessage: action.message
      };

    case actions.MESSAGE_EDITED_RESET:

      return {
        ...state,
        lastEditedMessage: null,
      };

    case actions.MESSAGE_REMOVED:

      return {
        ...state,
        lastRemovedMessage: action.message
      };

    case actions.MESSAGE_REMOVED_RESET:

      return {
        ...state,
        lastRemovedMessage: null
      };

    case actions.MESSAGE_ACTION_STATE_RESET:

      return {
        ...state,
        lastReceivedMessage: null,
        lastEditedMessage: null,
        lastRemovedMessage: null
      };

    case actions.USER_BANNED_ME:

      return {
        ...state,
        lastUserBannedMe: action.user,
        lastBanStatusChangedUser: action.user,
      };

    case actions.USER_UNBANNED_ME:

      return {
        ...state,
        lastUserUnbannedMe: action.user,
        lastBanStatusChangedUser: action.user,
      };

    case actions.I_BANNED_USER:

      return {
        ...state,
        lastUserIBanned: action.user,
        lastBanStatusChangedUser: action.user,
      };

    case actions.I_UNBANNED_USER:

      return {
        ...state,
        lastUserIUnBanned: action.user,
        lastBanStatusChangedUser: action.user,
      };


    case actions.CONVERSATION_OPEN:

      return {
        ...state,
        openedConversation: action.conversation
      };

    case actions.CONVERSATION_CLOSE:

      return {
        ...state,
        openedConversation: null
      };

    default:

      return state;
  }
}
