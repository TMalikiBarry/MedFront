import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'prettyPhoneNumber'
})
export class PrettyPhoneNumberPipe implements PipeTransform {

  transform(value: any): string | undefined {
    // Vérifier si la valeur est un numéro de téléphone valide
    if (!value || typeof value !== 'string') {
      return undefined;
    }

    // Supprimer tous les caractères non numériques et espaces
    // let phoneNumber = value.replace(/\D/g, '');
    let phoneNumber = value.replace(/[^\d\s]/g, '');
    if (!phoneNumber.trim())
      return undefined;
    // Vérifier si l'indicatif régional est présent
    if (['+221', '00221', '221'].some(indic => phoneNumber.startsWith(indic))) {
      phoneNumber = this.removeCountryCodePrefix(phoneNumber)
      // Formatter le numéro de téléphone avec indicatif régional
      return `+${phoneNumber.substring(0, 3)} ${phoneNumber.substring(3, 5)} ${phoneNumber.substring(5, 8)} ${phoneNumber.substring(8, 10)} ${phoneNumber.substring(10)}`;
    } else {
      // Formatter le numéro de téléphone sans indicatif régional
      return `${phoneNumber.substring(0, 2)} ${phoneNumber.substring(2, 5)} ${phoneNumber.substring(5, 7)} ${phoneNumber.substring(7, 9)} ${phoneNumber.substring(9)}`;
    }
  }

  removeCountryCodePrefix(value: string): string {
    // Supprime le préfixe "+" ou "00" s'il est présent au début de la chaîne
    return value.replace(/^(\+|00)/, '');
  }

}
