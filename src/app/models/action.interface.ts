import {FonctionnaliteInterface} from "./fonctionnalite.interface";

export interface ActionInterface {
  code:string;
  description:string;
  fonctionnalite: FonctionnaliteInterface;
}

