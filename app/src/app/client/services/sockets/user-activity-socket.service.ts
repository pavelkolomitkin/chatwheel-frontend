import {Injectable} from "@angular/core";
import {BaseSocketService} from "../../../core/services/base-socket.service";
import {map} from "rxjs/operators";
import {UserTyping} from "../../data/model/user-activity/user-typing.model";
import {ConversationMessageList} from "../../../core/data/models/messages/conversation-message-list.model";

@Injectable()
export class UserActivitySocketService extends BaseSocketService
{
  getNamespace(): string {
    return 'user_activity';
  }

  getUserTyping()
  {
    return this.fromEvent('user_is_typing_event')
      .pipe(
        map(data => <UserTyping>data)
      );
  }

  sendTyping(messageList: ConversationMessageList)
  {
    this.emit('typing', { messageList: messageList.id });
  }

  getUserBannedMe()
  {
    return this.fromEvent('user_has_banned_me')
      .pipe(
        map(data => data.user)
      );
  }

  getUserUnbannedMe()
  {
    return this.fromEvent('user_has_unbanned_me')
      .pipe(
        map(data => data.user)
      );
  }
}
