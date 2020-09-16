import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hostUrl'
})
export class HostUrlPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value + 'dww';
  }

}
