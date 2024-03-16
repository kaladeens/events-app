import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listCat'
})
export class ListCatPipe implements PipeTransform {

  transform(event: any, ...args: unknown[]): String {

    var text = ''
    for(let i =0; i<event.categoryList.length; i++){
      text = text + event.categoryList[i].categoryID;
      if (i!=event.categoryList.length-1){
          text = text + ', '
      }
    }
    return text;
  }
}
