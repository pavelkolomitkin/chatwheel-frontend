import {BaseSocketService} from "../../../core/services/base-socket.service";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";
import {ConversationMessage} from "../../../core/data/models/messages/conversation-message.model";
import {ConversationMessageList} from "../../../core/data/models/messages/conversation-message-list.model";
import {EditedMessage} from "../../data/model/messages/edited-message.model";
import {RemovedMessage} from "../../data/model/messages/removed-message.model";
import {ReceivedMessage} from "../../data/model/messages/received-message.model";


@Injectable()
export class MessageSocketService extends BaseSocketService
{
  getNamespace(): string {
    return 'messages';
  }

  getAddedMessage()
  {
    return this.fromEvent('message_added_event')
      .pipe(
        map(data => {

          const result: ReceivedMessage = new ReceivedMessage();
          result.message = ConversationMessage.createFromRawData(data.message);
          result.messageList = ConversationMessageList.createFromRawData(data.messageList);

          return result;
        })
      );
  }

  getEditedMessage()
  {
    return this.fromEvent('message_edited_event')
      .pipe(
        map((data) => {
          return Object.assign(new EditedMessage(), data);
        })
      );
  }

  getRemovedMessage()
  {
    return this.fromEvent('message_removed_event')
      .pipe(
        map((data) => {
          return Object.assign(new RemovedMessage(), data);
        })
      );
  }

  getNewMessageNumber()
  {
    return this.fromEvent('message_number_changed_event')
      .pipe(
        map((data) => {
          return data.newMessageNumber;
        })
      );
  }
}
