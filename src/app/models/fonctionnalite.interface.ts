import {ModuleInterface} from "./module.interface";

export interface FonctionnaliteInterface {
  code: string;
  description: string;
  bookmark: string;
  sequence: number;
  module: ModuleInterface;
  supprime: boolean;
  image: string;
}
