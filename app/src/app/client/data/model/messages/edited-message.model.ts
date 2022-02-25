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

    const result: ConversationMessage = Object.assign(new ConversationMessage(), {
      ...message,
      isRead: this.isRead,
      message: {
        ...message.message,
        text: text,
        updatedAt: updatedAt
      }
    });

    return result;
  }
}
