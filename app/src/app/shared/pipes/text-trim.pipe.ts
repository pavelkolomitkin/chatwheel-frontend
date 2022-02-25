import {Pipe, PipeTransform} from "@angular/core";


@Pipe({
  name: 'textTrim'
})
export class TextTrimPipe implements PipeTransform
{
  static DEFAULT_LIMIT = 100;

  static DEFAULT_TAIL = '...';

  transform(value: string, ...args: any[]): any {

    let result = value;

    const limit: number = typeof args[0] !== 'undefined' ? args[0] : TextTrimPipe.DEFAULT_LIMIT;
    const tail: string = typeof args[1] !== 'undefined' ? args[1] : TextTrimPipe.DEFAULT_TAIL;

    if (result.length > limit)
    {
      result = result.slice(0, limit) + tail;
    }

    return result;
  }

}
