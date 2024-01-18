import {PersonneInterface} from "./personne.interface";
import {PrestationInterface} from "./prestation.interface";
import {PoleInterface} from "./pole.interface";
import {TitreInterface} from "./titre.interface";
import {EntiteBase} from "./entite-base";

export interface PersonnelInterface extends EntiteBase{
  id?: number
  personne : PersonneInterface;
  prestations ?: PrestationInterface[];
  titre ?: TitreInterface;
  pole ?: PoleInterface | null;
}
