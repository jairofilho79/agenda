import { PipeTransform, Pipe } from '@angular/core';
import { Snippets } from 'src/shared/Snippets';

@Pipe({ name: 'phone'})
export class PhonePipe implements PipeTransform {
  transform(value: number) {
    return Snippets.buildPhoneMask(Snippets.onlyTelefoneNumbers(''+value));
  }

}
