import {Region} from "./region.model";

export interface Country
{
  id: string;

  name: string;

  region: Region;
}
