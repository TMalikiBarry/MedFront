import {PrestationInterface} from "./prestation.interface";
import {PoleInterface} from "./pole.interface";

export interface ServiceInterface {
  id?: number;
  nom?: string;
  description?: string;
  couleur?: string;
  equipement?: string;
  prestations?: PrestationInterface[];
  pole?: PoleInterface;
}
