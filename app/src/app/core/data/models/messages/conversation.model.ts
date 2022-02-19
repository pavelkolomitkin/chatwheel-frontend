import {Timestampable} from "../../../lib/timestampable.mixin";

@Timestampable
export class Conversation
{
  id: string;

  isIndividual: boolean;
}
