import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ConversationMessageList} from "../../core/data/models/messages/conversation-message-list.model";
import {BaseService} from "../../core/services/base.service";
import {map} from "rxjs/operators";
import {User} from "../../security/data/models/user.model";
import {Observable} from "rxjs";

@Injectable()
export class UserConversationService extends BaseService
{

  getList(latest: ConversationMessageList = null, lastDate: Date = null)
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
    return this.http.get<{list: ConversationMessageList[]}>('/client/conversation/list', { params }).pipe(
      map(data => {

        return data.list.map(item => ConversationMessageList.createFromRawData(item));
      })
    );
  }

  getIndividual(addressee: User): Observable<ConversationMessageList>
  {
    return this.http.get<{list: ConversationMessageList }>('/client/conversation/individual/' + addressee.id).pipe(
      map(({ list }) => {
        return ConversationMessageList.createFromRawData(list);
      })
    );
  }

  get(id: string)
  {
    return this.http.get<{ messageList: ConversationMessageList, members: any, banStatuses: [{ applicant, banned }] }>('/client/conversation/' + id).pipe(
      map(data => {

        const result: ConversationMessageList = ConversationMessageList.createFromRawData(data);
        return result;
      })
    );
  }

  remove(messageList: ConversationMessageList)
  {
    return this.http.delete('/client/conversation/' + messageList.id);
  }
}
