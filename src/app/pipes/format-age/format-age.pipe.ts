import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatAge'
})
export class FormatAgePipe implements PipeTransform {

  transform(value: string | Date | undefined, ...args: unknown[]): string | undefined {
    if (!value) return undefined;
    const birthDate = new Date(value);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();
    const birthHour = birthDate.getHours();

    let months = today.getMonth() - birthMonth;
    if (months < 0 || (months === 0 && today.getDate() < birthDay)) {
      age--;
      months += 12;
    }

    let days = today.getDate() - birthDay;
    if (days < 0) {
      months--;
      const prevMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, birthDay);
      days = Math.floor((today.getTime() - prevMonthDate.getTime()) / (1000 * 60 * 60 * 24));
    }

    let hours = today.getHours() - birthHour;
    if (hours < 0) {
      days--;
      hours += 24;
    }

    return this.formatAgeString(age, months, days, hours);
  }

  //Utiliser les maps
  getQualificatif(value: number, type: 'h' | 'j' | 'a' | 'm'): string {
    const map = {
      'h': {singular: 'heure', plural: 'heures'},
      'j': {singular: 'jour', plural: 'jours'},
      'a': {singular: 'an', plural: 'ans'},
      'm': {singular: 'mois', plural: 'mois'}
    };

    if (value < 0 || !(type in map)) {
      throw new Error('Valeur ou type invalide.');
    }

    return value === 1 ? map[type].singular : map[type].plural;
  }

  private formatAgeString(age: number, months: number, days: number, hours: number): string {
    if (age < 1) {
      if (months < 1) {
        if (days < 1) {
          return `${hours} ${this.getQualificatif(hours, 'h')}`;
        } else {
          return `${days} ${this.getQualificatif(days, 'j')} ${days < 3 ? (hours + ' '
            + this.getQualificatif(hours, 'h')) : ''}`;
        }
      } else {
        return `${months} mois ${months < 3 ? (days + ' ' + this.getQualificatif(days, 'j')) : ''}`;
      }
    } else if (age < 2) {
      if (months < 1) {
        return `${days} ${this.getQualificatif(days, 'j')} ${days < 3 ? (hours + ' '
          + this.getQualificatif(hours, 'h')) : ''}`;
      } else {
        return `${age} an ${months} mois - ( ${age * 12 + months} mois )`;
      }
    } else {
      return `${age} ans ${age < 4 ? (months + ' ' + this.getQualificatif(months, 'm')) : ''}`;
    }
  }

  // Utiliser les dictionnaires
  /*getQualificatif(value: number, type: 'h' | 'j' | 'a' | 'm'): string {
    const singular = { 'h': 'heure', 'j': 'jour', 'a': 'an', 'm': 'mois' };
    const plural = { 'h': 'heures', 'j': 'jours', 'a': 'ans', 'm': 'mois' };

    if (value < 0 || !(type in singular)) {
      throw new Error('Valeur ou type invalide.');
    }

    return value === 1 ? singular[type] : plural[type];
  }*/
}
