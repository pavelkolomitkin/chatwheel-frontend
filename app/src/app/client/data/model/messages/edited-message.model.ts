import {Message} from "../../../../core/data/models/messages/message.model";
import {ConversationMessage} from "../../../../core/data/models/messages/conversation-message.model";

export class EditedMessage
{
  id: string;

  isRead: boolean;

  messageList: string;

  message: Message;

  editMessage(message: ConversationMessage)
  {
    const { text, updatedAt } = this.message;

    message.isRead = this.isRead;
    message.message.text = text;
    message.message.updatedAt = updatedAt;
  }
}
