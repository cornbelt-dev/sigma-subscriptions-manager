import { Pipe, PipeTransform } from '@angular/core';
import { msToTime } from './util';

@Pipe({
  name: 'millisecondToTime'
})
export class MillisecondToTimePipe implements PipeTransform {
  transform(value: number): string {
    return msToTime(value);
  }
}
