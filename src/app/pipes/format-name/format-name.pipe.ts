import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatName',
  standalone: true
})
export class FormatNamePipe implements PipeTransform {

  transform(value: string | undefined | null, formatType: 'name' | 'username' | 'filename' | 'server_filename',
            index: 'DETAILED' | 'NOTDETAILED' = 'DETAILED', startC?: number): string {
    if (typeof value === "undefined" || value === null) {
      return '';
    }
    if (formatType === 'server_filename') {
      let start = startC ?? index === 'NOTDETAILED' ? 6 : 3;
      return value.split('_').slice(start).join("_");
    }
    if (formatType === 'filename') {
      return (value.substring(0, value.lastIndexOf('.'))).length >= 25 ? value.slice(0, 27) + '...' : value;
    }
    let names = value.split(" ");
    let formattedNames = [];

    for (let n of names) {
      let firstName = formatType === 'name' ? n.substring(1).toLowerCase() : n.substring(1);
      if (n !== names[names.length - 1]) {
        n = n.substring(0, 1).toUpperCase() + firstName;
      } else {
        n = formatType === 'name' ? n.toUpperCase() : n.substring(0, 1).toUpperCase() + firstName;
      }
      formattedNames.push(n);
    }
    return formattedNames.join(" ");
  }

}
