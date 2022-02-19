import {Timestampable} from "../../../lib/timestampable.mixin";
import {ConversationMessage} from "./conversation-message.model";

@Timestampable
export class ConversationMessageList
{
  id: string;

  //conversation: Conversation;

  lastMessage?: ConversationMessage;

  static createFromRawData(data: any): ConversationMessageList
  {
    const result: ConversationMessageList = Object.assign(new ConversationMessageList(), data);

    if (!!data.lastMessage)
    {
      result.lastMessage = ConversationMessage.createFromRawData(data.lastMessage)
    }

    // @ts-ignore
    result.transformTimestamps();

    return result;
  }
}
