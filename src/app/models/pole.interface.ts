import {CliniqueInterface} from "./clinique.interface";

export interface PoleInterface {
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
