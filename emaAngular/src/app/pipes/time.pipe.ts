import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    let time = "";
    if(hours > 0){
      time += hours + " hours ";
    }
    if(minutes > 0){
      time += minutes + " minutes";
    }
    return time;
  }

}
