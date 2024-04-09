import {CliniqueInterface} from "./clinique.interface";
import {EntiteBase} from "./entite-base";
import {PersonnelInterface} from "./personnel.interface";

export interface PoleInterface extends EntiteBase {
  id?: number;
  code?: string;
  nom: string;
  description?: string;
  localisation?: string;
  horaire?: string;
  reponsable?: string;
  equipement?: string;
  serviceNumber?: number;
  superviseur?: PersonnelInterface;
  clinique?: CliniqueInterface;
}
