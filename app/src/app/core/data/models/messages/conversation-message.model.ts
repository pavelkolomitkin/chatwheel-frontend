import {Message} from "./message.model";
import {Timestampable} from "../../../lib/timestampable.mixin";

export class ConversationMessage
{
  id: string;

  message: Message;

  isRead: boolean

  static createFromRawData(data: any): ConversationMessage
  {
    const result: ConversationMessage = Object.assign(new ConversationMessage(), data);

    result.message = Message.createFromRawData(data.message);

    return result;
  }
}
