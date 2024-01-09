import {PersonneInterface} from "./personne.interface";
import {PrestationInterface} from "./prestation.interface";
import {TitreInterface} from "./titre.interface";
import {PoleInterface} from "./pole.interface";

export interface PatientInterface {
  id?: number;
  personne: PersonneInterface; // Assurez-vous que l'interface Personne est également définie
  prestations?: PrestationInterface[]; // Assurez-vous que l'interface Prestation est également définie
  titre: TitreInterface; // Assurez-vous que l'interface Titre est également définie
  pole: PoleInterface;
}
