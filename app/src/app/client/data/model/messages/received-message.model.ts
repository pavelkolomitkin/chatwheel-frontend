import {ConversationMessage} from "../../../../core/data/models/messages/conversation-message.model";
import {ConversationMessageList} from "../../../../core/data/models/messages/conversation-message-list.model";

export class ReceivedMessage
{
  message: ConversationMessage;

  messageList: ConversationMessageList;
}
