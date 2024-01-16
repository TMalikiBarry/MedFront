import {PersonnelInterface} from "./personnel.interface";

export interface TitreInterface {
  code: string;
  libelle: string;
  supprim: boolean | null;
  personnels?: PersonnelInterface[];
}
