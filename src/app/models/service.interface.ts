import {PrestationInterface} from "./prestation.interface";
import {PoleInterface} from "./pole.interface";
import {EntiteBase} from "./entite-base";

export interface ServiceInterface extends EntiteBase{
  id?: number;
  nom?: string;
  description?: string;
  couleur?: string;
  equipement?: string;
  prestations?: PrestationInterface[];
  pole?: PoleInterface;
  cout?: number;
}
