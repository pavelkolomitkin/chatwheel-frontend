import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UploadFileService} from "../../../core/services/upload/upload-file.service";
import {filter, map} from "rxjs/operators";
import {User} from "../../../security/data/models/user.model";
import {
  ChatRouletteOffer, ChatRouletteOfferType,
} from "../../data/model/search/chat-roulette-offer.model";


@Injectable()
export class ChatRouletteService
{
  constructor(
    private http: HttpClient,
    private uploadService: UploadFileService
  ) {
  }

  turnOn(
    capturedPicture: File
  )
  {
    return this.uploadService.upload(capturedPicture, '/client/chat-roulette/turn-on', 'image')
      .pipe(
        // @ts-ignore
        filter(data => data.type === UploadFileService.UPLOAD_EVENT_TYPE_COMPLETE),
        map(data => null)
      );
  }

  turnOff()
  {
    return this.http.put('/client/chat-roulette/turn-off', {});
  }

  search()
  {
    return this
      .http
      .post(
      '/client/chat-roulette/search', {}
    )
      .pipe(
        map((data) => {
          return ChatRouletteOffer.createFromRawData(data);
        })
      );
  }

  acceptOffer(offer: ChatRouletteOffer)
  {
    return this.http.put('/client/chat-roulette/accept-offer/' + offer.id, {})
      .pipe(
        map((data) => {
          return ChatRouletteOffer.createFromRawData(data);
        })
      );
  }
}
