import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appAppPositiveNumber]'
})
export class AppPositiveNumberDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value;

    // Remplace toute valeur non numérique par une chaîne vide
    input.value = value.replace(/[^0-9]/g, '');
  }

}
