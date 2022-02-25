import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiLine'
})
export class MultiLinePipe implements PipeTransform {

  transform(value: string, args?: any): any
  {
    let result = value.replace(new RegExp('\n', 'g'), "<br />");

    return result;
  }

}
