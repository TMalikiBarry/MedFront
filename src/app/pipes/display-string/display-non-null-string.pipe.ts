import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'displayString'
})
export class DisplayNonNullStringPipe implements PipeTransform {

  transform(value: any, type?: 'F' | 'M', ...args: unknown[]): string {
    return value ?? ('Non renseigné' + (type === 'F' ? 'e' : ''));
  }

}
