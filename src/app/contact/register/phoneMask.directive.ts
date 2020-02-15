import { Directive, HostListener, ElementRef } from '@angular/core';
import { Snippets } from 'src/shared/onlyNumber';

@Directive({
  selector: '[adaptativePhoneMask]'
})

export class PhoneMaskDirective {
  constructor(el: ElementRef) {
    el.nativeElement.addEventListener('keyup', (event) => {
      const str = Snippets.onlyTelefoneNumbers(el.nativeElement.value);

      //Last or:
      //Try to erase the parentheses, but it not counted in the str. So nothing is done.
      if(isNaN(Number(str)) || str.length >= 12 || (event.keyCode === 8 && el.nativeElement.value.length === 3)) {
        el.nativeElement.value = buildMask(removeElement(str))
        return;
      }
      el.nativeElement.value = buildMask(str);

    })
 }
}

function removeElement(str) {
  return str.substring(0,str.length-1);
}

function buildMask(str) {
  const ddd              = str.substring(0,2);
  const mobile           = str.length === 11 ? str.substring(2,3) : ""
  const phoneNumberPart1 = mobile ? str.substring(3,7) : str.substring(2,6);
  const phoneNumberPart2 = str.length > 6 ? mobile ? str.substring(7,11) : str.substring(6,11) : "";
  // (00) 0 0000-0000
  return ``
    +`${ddd ? "(" :""}`
    +`${ddd}`
    +`${ddd.length >=2 ? ")" : ""}`
    +`${mobile ? " " : ""}`
    +`${mobile}`
    +`${phoneNumberPart1 ? " ": ""}`
    +`${phoneNumberPart1}`
    +`${phoneNumberPart2 ? "-":""}`
    +`${phoneNumberPart2}`
}


