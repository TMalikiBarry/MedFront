import {AccesInterface} from "./acces.interface";

export interface LogAction {
  id: number;
  dateDebut: string; // Assurez-vous d'utiliser le type de date approprié
  dateFin: string; // Assurez-vous d'utiliser le type de date approprié
  ipAdresse: string;
  action: EAction;
  ressource: string;
  userAgent: string;
  requestMethod: string;
  identifiantRessource: number;
  url: string;
  page: string;
  refererPage: string;
  queryString: string;
  status: string;
  environnement: string;
  acces?: AccesInterface; // Assurez-vous que Acces est également défini
}

export enum EAction {
  // Définissez vos valeurs enum ici
  CREATION, UPDATE, SUPPRESSION, RECUPERATION, INCONNU
}
