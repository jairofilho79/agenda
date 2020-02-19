import { Pipe, PipeTransform } from '@angular/core';
import { Snippets } from 'src/shared/Snippets';

@Pipe({name:'name'})
export class NamePipe implements PipeTransform {
  transform(value: string) {
    return Snippets.cropName(value)
  }

}
