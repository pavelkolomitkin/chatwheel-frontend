
import * as actions from './actions';
import {User} from "../../../security/data/models/user.model";
import {CallMemberLink} from "../model/calls/call-member-link.model";
import {Call} from "../model/calls/call.model";
import {CALL_INCOMING_CALL_RECEIVED} from "./actions";

export interface State
{
  callWindowId: string;

  lastInitiatedDirectCallAddressee: User;
  lastDirectedIncomingCall: Call,

  lastMemberConnectingLink: CallMemberLink;
  lastMemberConnectedLink: CallMemberLink;
  lastMemberRejectedLink: CallMemberLink;
  lastMemberHungUpLink: CallMemberLink;
}

export const initialState: State = {

  callWindowId: null,

  lastInitiatedDirectCallAddressee: null,
  lastDirectedIncomingCall: null,

  lastMemberConnectingLink: null,
  lastMemberConnectedLink: null,
  lastMemberRejectedLink: null,
  lastMemberHungUpLink: null,

};

export function reducer(state: State = initialState, action: actions.ClientCallActions): State
{
  switch (action.type) {

    case actions.SET_CALL_WINDOW_ID:

      return {
        ...state,
        callWindowId: action.id
      };

    case actions.USER_INITIATE_DIRECT_CALL:

      return {
        ...state,
        lastInitiatedDirectCallAddressee: action.addressee
      };


    case actions.CALL_MEMBER_IS_CONNECTING:

      return {
        ...state,
        lastMemberConnectingLink: action.link
      };


    case actions.CALL_MEMBER_IS_CONNECTED:

      return {
        ...state,
        lastMemberConnectedLink: action.link
      };

    case actions.CALL_MEMBER_REJECTED:

      return {
        ...state,
        lastMemberRejectedLink: action.link
      };

    case actions.CALL_MEMBER_HUNG_UP:

      return {
        ...state,
        lastMemberHungUpLink: action.link
      };


    case actions.CALL_INCOMING_CALL_RECEIVED:

      return {
        ...state,
        lastDirectedIncomingCall: action.call
      };

    default:
      return state;
  }
}
