import {Injectable} from "@angular/core";
import {BaseSocketService} from "../../../core/services/base-socket.service";
import {map} from "rxjs/operators";
import {UserTyping} from "../../data/model/user-activity/user-typing.model";
import {ConversationMessageList} from "../../../core/data/models/messages/conversation-message-list.model";
import {User} from "../../../security/data/models/user.model";

@Injectable()
export class UserActivitySocketService extends BaseSocketService
{
  getNamespace(): string {
    return 'user_activity';
  }

  getIHasBeenDeleted()
  {
    return this.fromEvent('i_has_been_deleted');
  }

  getIHasBeenBlocked()
  {
    return this
      .fromEvent('i_has_been_blocked')
      .pipe(
        map(data => data.blockingReason)
      )
      ;
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
        map(this.userMapData)
      );
  }

  getUserUnbannedMe()
  {
    return this.fromEvent('user_has_unbanned_me')
      .pipe(
        map(this.userMapData)
      );
  }

  getIBannedUser()
  {
    return this.fromEvent('i_has_banned_user')
      .pipe(
        map(this.userMapData)
      );
  }

  getIUnbannedUser()
  {
    return this.fromEvent('i_has_unbanned_user')
      .pipe(
        map(this.userMapData)
      );
  }

  userMapData({ user, amIBanned, isBanned })
  {
    const result: User = User.createFromRawData(user);
    result.amIBanned = amIBanned;
    result.isBanned = isBanned;

    return result;
  }
}
