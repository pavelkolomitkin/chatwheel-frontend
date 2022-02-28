import {User} from "../../../../security/data/models/user.model";

export enum CallMemberStatus {
  IN_PENDING = 0,
  CONNECTING = 1,
  CONNECTED = 2,
  REJECTED = 3,
  HUNG_UP = 4
}

export class CallMember
{
  id: string;

  user: User;

  joinTime: string;

  leftTime: string;

  isInitiator: boolean;

  status: CallMemberStatus;

  createdAt: string;

  updatedAt: string;

  static createFromRawData(data: any)
  {
    const result: CallMember = Object.assign(new CallMember(), data);
    result.user = User.createFromRawData(data.user);

    return result;
  }
}
