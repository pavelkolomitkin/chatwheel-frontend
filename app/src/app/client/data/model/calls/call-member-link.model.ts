import {User} from "../../../../security/data/models/user.model";

export enum CallMemberLinkStatus {
  CONNECTING = 0,
  CONNECTED = 1,
  REJECTED = 2,
  HUNG_UP = 3
}

export class CallMemberLink
{
  id: string;

  call: string;

  initiator: User;

  addressee: User;

  initiatorPeer: string;

  addresseePeer: string;

  status: CallMemberLinkStatus;

  createdAt: string;

  updatedAt: string;

  static createFromRawData(data: any)
  {
    const result: CallMemberLink = Object.assign(new CallMemberLink(), data);

    result.initiator = User.createFromRawData(data.initiator);
    result.addressee = User.createFromRawData(data.addressee);

    return result;
  }
}
