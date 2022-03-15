import {Region} from "./region.model";

export interface Country
{
  id: string;

  name: string;

  code: string;

  region: Region;
}
