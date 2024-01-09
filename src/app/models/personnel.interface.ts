import {PersonneInterface} from "./personne.interface";
import {PrestationInterface} from "./prestation.interface";
import {PoleInterface} from "./pole.interface";

export interface PersonnelInterface {
  id?: number
  personne : PersonneInterface;
  prestations ?: PrestationInterface[];
  titre ?: string;
  pole ?: PoleInterface;
}
