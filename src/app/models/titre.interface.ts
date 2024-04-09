import {PersonnelInterface} from "./personnel.interface";
import {EntiteBase} from "./entite-base";

export interface TitreInterface extends EntiteBase {
  code: string;
  libelle?: string;
  personnels?: PersonnelInterface[];
}
