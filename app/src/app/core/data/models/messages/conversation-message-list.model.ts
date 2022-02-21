import {ConversationMessage} from "./conversation-message.model";
import {User} from "../../../../security/data/models/user.model";

export class ConversationMessageList
{
  id: string;

  members?: [{ joinTime: Date, member: User }];

  lastMessage?: ConversationMessage;

  newMessageNumber: number = 0;

  createdAt: string;

  updatedAt: string;

  static createFromRawData(data: any): ConversationMessageList
  {
    const result: ConversationMessageList = Object.assign(new ConversationMessageList(), data);

    if (!!data.lastMessage)
    {
      result.lastMessage = ConversationMessage.createFromRawData(data.lastMessage)
    }

    if (!!data.members)
    {
      result.members = data.members.map(item => {
        return {
          joinTime: item.joinTime,
          member: User.createFromRawData(item.member)
        }
      });
    }


    return result;
  }
}
