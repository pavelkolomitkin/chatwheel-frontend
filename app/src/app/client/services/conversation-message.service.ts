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
          lastDate: string = null,
          latest: ConversationMessage = null)
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

        return ConversationMessage.createFromRawData(message);
      })
    );
  }

  readLastMessage(list: ConversationMessageList)
  {
    return this.http.put('/client/message/read-last/' + list.id, {});
  }

  edit(message: ConversationMessage, text: string)
  {
    return this.http.put<{ message: ConversationMessage }>('/client/message/edit', {
      messageId: message.id,
      text: text
    })
      .pipe(
        map(({ message }) => {
          return ConversationMessage.createFromRawData(message);
        })
      );
  }

  remove(message: ConversationMessage, removeFromOthers: boolean)
  {
    const params = this.getHttpParamsFromObject({
      removeFromOthers
    });

    return this.http.delete('/client/message/' + message.id, { params });
  }
}
