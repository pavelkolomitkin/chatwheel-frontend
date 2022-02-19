import {User} from "../../../../security/data/models/user.model";
import {Timestampable} from "../../../lib/timestampable.mixin";

export enum MessageType
{
  TEXT,
  CALL_START,
  CALL_END,
  CALL_UNANSWERED
}

@Timestampable
export class Message
{
  id: string;

  text: string;

  author: User;

  type: string;

  static createFromRawData(data: any): Message
  {
    const result: Message = Object.assign(new Message(), data);

    result.author = User.createFromRawData(data.author);
    // @ts-ignore
    result.transformTimestamps();

    return result;
  }
}
