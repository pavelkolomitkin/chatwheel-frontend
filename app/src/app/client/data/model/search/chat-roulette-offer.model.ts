import {User} from "../../../../security/data/models/user.model";

export enum ChatRouletteOfferType {
  SEARCH_PARTNER_FOUND = 'found',
  SEARCH_PARTNER_OFFERED = 'offered',
  SEARCH_PARTNER_ACCEPTED = 'accepted'
}

export class ChatRouletteOffer
{
  id: string;

  addressee: User;

  type: ChatRouletteOfferType;

  static createFromRawData(data)
  {
    const result: ChatRouletteOffer = Object.assign(new ChatRouletteOffer(), data);

    result.addressee = User.createFromRawData(data.addressee);

    return result;
  }
}
