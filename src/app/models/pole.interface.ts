import {CliniqueInterface} from "./clinique.interface";
import {EntiteBase} from "./entite-base";

export interface PoleInterface extends EntiteBase {
  id?: number;
  code: string;
  dateCreation: string; // Assurez-vous d'utiliser un format de date approprié
  nom: string;
  supprime: boolean;
  description: string;
  localisation: string;
  horaire: string;
  reponsable: string;
  equipement: string;
  clinique?: CliniqueInterface;
}
