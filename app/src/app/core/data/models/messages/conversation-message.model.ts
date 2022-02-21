import {Message} from "./message.model";

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
