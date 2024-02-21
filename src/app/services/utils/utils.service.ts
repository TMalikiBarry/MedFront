import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

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

  removeSpace(value: string): string {
    return value.trim().replace(/\s/g, '_');
  }
}
