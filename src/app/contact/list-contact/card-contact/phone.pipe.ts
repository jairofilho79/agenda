import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'phone'})
export class PhonePipe implements PipeTransform {
  transform(value: number) {
    if(value === null) return "Sem Telefone";

    const str = value.toString()
    const mobile = str.length % 2;
    const ddd = str.substring(0,2)
    const mobilePhone =  mobile? str.substring(2,3)+' ' : '';
    const firstHalf = str.substring(2+mobile, 6+mobile);
    const secondHalf = str.substring(6+mobile, 10+mobile);

    return `(${ddd}) ${mobilePhone}${firstHalf}-${secondHalf}`
  }

}
