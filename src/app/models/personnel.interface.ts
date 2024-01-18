import {PersonneInterface} from "./personne.interface";
import {PrestationInterface} from "./prestation.interface";
import {PoleInterface} from "./pole.interface";
import {TitreInterface} from "./titre.interface";

export interface PersonnelInterface {
  id?: number
  personne : PersonneInterface;
  prestations ?: PrestationInterface[];
  titre ?: TitreInterface;
  pole ?: PoleInterface;
}
