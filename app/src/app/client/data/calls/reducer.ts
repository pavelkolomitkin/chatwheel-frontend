
import * as actions from './actions';
import {User} from "../../../security/data/models/user.model";
import {CallMemberLink} from "../model/calls/call-member-link.model";
import {Call} from "../model/calls/call.model";

export interface State
{
  callWindowId: string;

  lastInitiatedDirectCallAddressee: User;
  lastDirectedIncomingCall: Call,
  incomingCallNumber: number,

  lastMemberConnectingLink: CallMemberLink;
  lastMemberConnectedLink: CallMemberLink;
  lastMemberRejectedLink: CallMemberLink;
  lastMemberHungUpLink: CallMemberLink;
}

export const initialState: State = {

  callWindowId: null,

  lastInitiatedDirectCallAddressee: null,
  lastDirectedIncomingCall: null,
  incomingCallNumber: 0,

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


    case actions.CALL_INCOMING_CALL_INCREASE_NUMBER:

      let incomingCallNumber = state.incomingCallNumber + action.value;
      if (incomingCallNumber < 0)
      {
        incomingCallNumber = 0;
      }

      return {
        ...state,
        incomingCallNumber: incomingCallNumber
      };

    case actions.CALL_INCOMING_CALL_SET_NUMBER:

      return {
        ...state,
        incomingCallNumber: action.value
      };

    default:
      return state;
  }
}
