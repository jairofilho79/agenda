import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:'name'})
export class NamePipe implements PipeTransform {
  transform(value: string) {
    if(value.length > 23) return value.substring(0,23)+'...'
    return value
  }

}
