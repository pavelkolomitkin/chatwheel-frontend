import {Action} from "@ngrx/store";
import {User} from "../../../security/data/models/user.model";
import {Call} from "../model/calls/call.model";
import {CallMemberLink} from "../model/calls/call-member-link.model";

export const SET_CALL_WINDOW_ID = 'SET_CALL_WINDOW_ID';

export const USER_INITIATE_DIRECT_CALL = 'USER_INITIATE_CALL';

export const CALL_INCOMING_CALL_RECEIVED = 'CALL_INCOMING_CALL_RECEIVED';
export const CALL_MEMBER_IS_CONNECTING = 'CALL_MEMBER_IS_CONNECTING';
export const CALL_MEMBER_IS_CONNECTED = 'CALL_MEMBER_IS_CONNECTED';
export const CALL_MEMBER_REJECTED = 'CALL_MEMBER_REJECTED';
export const CALL_MEMBER_HUNG_UP = 'CALL_MEMBER_HUNG_UP';

export class SetCallWindowId implements Action
{
  readonly type = SET_CALL_WINDOW_ID;

  constructor(public id: string) { }
}

export class UserInitiateDirectCall implements Action
{
  readonly type = USER_INITIATE_DIRECT_CALL;

  constructor(public addressee: User) {}
}

export class IncomingCallReceived implements Action
{
  readonly type = CALL_INCOMING_CALL_RECEIVED;

  constructor(public call: Call) { }
}

export class CallMemberConnecting implements Action
{
  readonly type = CALL_MEMBER_IS_CONNECTING;

  constructor(public link: CallMemberLink) { }
}

export class CallMemberConnected implements Action
{
  readonly type = CALL_MEMBER_IS_CONNECTED;

  constructor(public link: CallMemberLink) { }
}

export class CallMemberRejected implements Action
{
  readonly type = CALL_MEMBER_REJECTED;

  constructor(public link: CallMemberLink) { }
}

export class CallMemberHungUp implements Action
{
  readonly type = CALL_MEMBER_HUNG_UP;

  constructor(public link: CallMemberLink) { }
}

export type ClientCallActions =
  SetCallWindowId
  | UserInitiateDirectCall
  | IncomingCallReceived
  | CallMemberConnecting
  | CallMemberConnected
  | CallMemberRejected
  | CallMemberHungUp

  ;
