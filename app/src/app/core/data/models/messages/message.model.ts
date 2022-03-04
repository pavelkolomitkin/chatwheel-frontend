import {User} from '../../../../security/data/models/user.model';
import {Call} from '../../../../client/data/model/calls/call.model';

export enum MessageType
{
  TEXT,
  CALL_START,
  CALL_END,
  CALL_UNANSWERED
}

export class Message
{
  id: string;

  text: string;

  author?: User;

  type: number;

  createdAt: string;

  updatedAt: string;

  call?: Call;

  static createFromRawData(data: any): Message
  {
    const result: Message = Object.assign(new Message(), data);
    if (!!data.author)
    {
      result.author = User.createFromRawData(data.author);
    }
    if (!!data.call)
    {
      result.call = Call.createFromRawData(data.call);
    }

    return result;
  }
}
