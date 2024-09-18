import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'displayString'
})
export class DisplayNonNullStringPipe implements PipeTransform {

  transform(value: any, type?: 'F' | 'M', ...args: unknown[]): string {
    /*value = (typeof value === 'string' && value == "") ? undefined : value;
    return value ?? ('Non renseigné' + (type === 'F' ? 'e' : ''));*/
    return (value && value !== "") ? value : `Non renseigné${type === 'F' ? 'e' : ''}`;
  }

}
