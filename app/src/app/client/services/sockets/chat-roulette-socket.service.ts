import {BaseSocketService} from "../../../core/services/base-socket.service";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";
import {ChatRouletteOffer} from "../../data/model/search/chat-roulette-offer.model";

@Injectable()
export class ChatRouletteSocketService extends BaseSocketService
{
  getNamespace(): string {
    return 'chat-roulette-search';
  }

  getAcceptedOffer()
  {
    return this.fromEvent('chat_roulette_user_accepted_offer')
      .pipe(
        map((data) => {
          return ChatRouletteOffer.createFromRawData(data);
        })
      );
  }
}
