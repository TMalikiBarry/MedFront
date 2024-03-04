import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  timeDiffs = {
    //        day    hour   minute    second    millisecond
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000
  }

  transform(value: string | Date): string {

    const diff = Date.now() - new Date(value).getTime();
    if (diff < this.timeDiffs.day) {

      // return diff / (60 * 60 * 1000) < 2 ? 'Il y a une heure' : `Il y a ${Math.trunc(diff / (60 * 60 * 1000))} heures`;
      return 'Aujourd\'hui';
    } else {
      if (diff / this.timeDiffs.day < 2) {
        return 'Hier';
      } else if (diff / this.timeDiffs.day < 3) {
        return 'Avant-hier';
      }
      return `Il y a ${Math.trunc(diff / (24 * 60 * 60 * 1000))} jours`;
    }
  }

}
