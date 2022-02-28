import {CallMember} from "./call-member.model";

export enum CallStatus {
  INITIATED = 0,
  IN_PROGRESS = 1,
  ENDED = 2,
  UNANSWERED = 3
}

export class Call
{
  id: string;

  endTime: string;

  isDirect: boolean;

  status: CallStatus;

  members: CallMember[] = [];

  createdAt: string;

  updatedAt: string;

  static createFromRawData(data: any)
  {
    const result: Call = Object.assign(new Call(), data);
    result.members = [];

    for (let member of data.members)
    {
      result.members.push(
        CallMember.createFromRawData(member)
      );
    }

    return result;
  }
}
