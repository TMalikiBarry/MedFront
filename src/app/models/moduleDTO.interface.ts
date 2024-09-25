import {FonctionnaliteInterface} from "./fonctionnalite.interface";

export interface ModuleDTOInterface {
  code: string;
  description: string;
  sequence: number;
  supprime: boolean;
  image: string;
  fonctionnalites: FonctionnaliteInterface[];
  bookmark: string;
}
