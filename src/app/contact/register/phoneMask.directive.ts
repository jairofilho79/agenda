import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { Snippets } from 'src/shared/Snippets';

@Directive({
  selector: '[adaptativePhoneMask]'
})

export class PhoneMaskDirective implements OnInit{

  @Input() value: string;

  constructor(private el: ElementRef) {

    el.nativeElement.addEventListener('keyup', (event) => {
      const str = Snippets.onlyTelefoneNumbers(el.nativeElement.value);

      //Last or:
      //Try to erase the parentheses, but it not counted in the str. So nothing is done.
      if(isNaN(Number(str)) || str.length >= 12 || (event.keyCode === 8 && el.nativeElement.value.length === 3)) {
        el.nativeElement.value = Snippets.buildPhoneMask(removeElement(str))
        return;
      }
      el.nativeElement.value = Snippets.buildPhoneMask(str);
    })
  }

  ngOnInit(): void {
    if(this.value)
    this
      .el
      .nativeElement
      .value =
      Snippets.buildPhoneMask(
          Snippets.onlyTelefoneNumbers(
            this.value
          )
        );
    }
  }

function removeElement(str) {
  return str.substring(0,str.length-1);
}
