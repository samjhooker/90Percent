import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'first'
})
export class FirstPipe {
  transform(val: any[] | any) {
    if (val === null) return val;
    return val[0];
  }
}