import {User} from "../../../../security/data/models/user.model";

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

  author: User;

  type: string;

  createdAt: string;

  updatedAt: string;

  static createFromRawData(data: any): Message
  {
    const result: Message = Object.assign(new Message(), data);

    result.author = User.createFromRawData(data.author);

    return result;
  }
}
