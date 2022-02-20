import {BaseService} from '../../core/services/base.service';
import {ConversationMessageList} from "../../core/data/models/messages/conversation-message-list.model";
import {Message} from "../../core/data/models/messages/message.model";
import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {User} from "../../security/data/models/user.model";
import {ConversationMessage} from "../../core/data/models/messages/conversation-message.model";

@Injectable()
export class ConversationMessageService extends BaseService
{
  getList(messageList: ConversationMessageList,
          lastDate: Date = null,
          latest: Message = null)
  {
    const data: Object = {};

    if (latest)
    {
      // @ts-ignore
      data.latestId = latest.id;
    }
    if (lastDate)
    {
      // @ts-ignore
      data.lastDate = lastDate;
    }

    const params: HttpParams = this.getHttpParamsFromObject(data);
    return this.http.get<{ list: ConversationMessage[] }>('/client/message/list/' + messageList.id, { params }).pipe(
      map(({ list }) => {
        //debugger;
        return list.map(item => ConversationMessage.createFromRawData(item))
      })
    );
  }

  sendToUser(addressee: User, text: string)
  {
    return this.http.post<{ message: ConversationMessage, conversation: ConversationMessageList }>('/client/message/send-user', {
      addresseeId: addressee.id,
      text: text
    }).pipe(
      map(data => {

        debugger;

        return {
          message: ConversationMessage.createFromRawData(data.message),
          conversation: ConversationMessageList.createFromRawData(data.conversation)
        };
      })
    );
  }

  sendToConversation(conversation: ConversationMessageList, text: string)
  {
    return this.http.post<{ message: ConversationMessage }>('/client/message/send-conversation', {
      conversationId: conversation.id,
      text: text
    }).pipe(
      map(({ message }) => {
        //debugger;
        return ConversationMessage.createFromRawData(message);
      })
    );
  }
}
