import { Pipe, PipeTransform } from '@angular/core';
import {environment} from "../../../environments/environment";

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform
{
  transform(value: string, ...args: any[]): any {

    return environment.baseApiUrl + value;

  }

}
