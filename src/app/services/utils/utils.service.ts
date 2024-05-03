import {Injectable} from '@angular/core';
import {EGenre, PersonneInterface} from "../../models/personne.interface";
import {PersonnelInterface} from "../../models/personnel.interface";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getInitials(firstName: string): string {
    return firstName.split(' ').map(word => word.charAt(0).toUpperCase() + '.').join(' ');
  }

  getDayInfo(dateString: string): { id: number, label: string } {
    // Créer un objet Date à partir de la chaîne de date
    const date = new Date(dateString);

    // Jours de la semaine
    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

    // Index du jour de la semaine (0 pour Dimanche, 1 pour Lundi, ..., 6 pour Samedi)
    const dayIndex = date.getDay();

    // Renvoyer un objet avec l'index et le nom du jour
    return {id: dayIndex, label: daysOfWeek[dayIndex]};
  }

  getAge(dateNaissance: string | Date): number {
    const birthDate = new Date(dateNaissance);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    // Si le mois actuel est avant le mois de naissance,
    // ou si c'est le mois de naissance mais que le jour actuel est avant le jour de naissance,
    // soustraire 1 de l'âge
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  isAPhoneNumber(value: string): boolean {
    // Supprimer tous les caractères non numériques ou non espace
    if (!value) return false;
    let phoneNumber = value.replace(/[^\d\s]/g, '');
    return !!phoneNumber.trim();
  }

  isValidPhoneNumber(value: string) {
    // Supprimer tous les caractères non numériques ou non espace
    let phoneNumber = value.replace(/[^\d\s]/g, '');

    // Expression régulière pour valider le numéro de téléphone
    let phoneNumberPattern = /^(?:\+|00)?(221|33)?7[0-9]{8}$/;

    // Vérifier si le numéro de téléphone correspond au modèle
    return phoneNumberPattern.test(phoneNumber);
  }

  numberIsDefined(value: number): boolean {
    return value !== null && value !== undefined;
  }

  removeSpace(value: string): string {
    return value.trim().replace(/\s/g, '_');
  }

  formatPhoneNumber(value: string): string {
    let formattedNumber: string;

    if (['00221', '+221', '221'].some(v => value.startsWith(v))) {
      formattedNumber = this.removeCountryCodePrefix(value).replace(/\s+/g, '')
        .replace(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/, '+$1 $2 $3 $4 $5');
    } else {
      formattedNumber = value!.replace(/\s+/g, '')
        .replace(/^(\d{2})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4');
    }

    return formattedNumber;
  }

  removeCountryCodePrefix(value: string): string {
    // Supprime le préfixe "+" ou "00" s'il est présent au début de la chaîne
    return value.replace(/^(\+|00)/, '');
  }

  getPatientGenre(type: EGenre): 'Homme' | 'Femme' {
    return type === 'M' ? 'Homme' : 'Femme';
  }

  getPrenom(personne: PersonneInterface): string | undefined {
    if (!personne) return undefined;
    return `${personne.prenom}`
  }

  getNom(personne: PersonneInterface): string | undefined {
    if (!personne) return undefined;
    return `${personne.nom}`
  }

  getFullName(p?: PersonnelInterface): string | undefined {
    if (!p || !p.personne) return undefined;
    return `${p.personne.prenom} ${p.personne.nom}`
  }

}
