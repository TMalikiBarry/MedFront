import {PoleInterface} from "./pole.interface";
import {EntiteBase} from "./entite-base";

export interface CliniqueInterface extends EntiteBase {
  code: string;
  nom: string;
  logo: string;
  codeCouleur: string;
  adressse: string;
  urlSiteWeb: string;
  datecreation: string; // Assurez-vous d'utiliser un format de date approprié
  supprime: boolean;
  solde: number;
  dateFoundation: string; // Assurez-vous d'utiliser un format de date approprié
  equipementsGeneraux: string;
  poles?: PoleInterface[];
}
