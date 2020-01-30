import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:'name'})
export class NamePipe implements PipeTransform {
  transform(value: string) {
    if(value.length > 12) return value.substring(0,12)+'...'
    return value
  }

}
