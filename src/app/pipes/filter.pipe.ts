import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(array: any[], text: string, column: string): any[] {
    if (text === '' || !array) {
      return array;
    }

    text = text.toLocaleLowerCase();

    return array.filter(
      item => item[column].toLowerCase().includes(text)
    )
  }

}
