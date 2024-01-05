import {EntiteBase} from "./entite-base";
import {ServiceInterface} from "./service.interface";

export interface PrestationInterface extends EntiteBase {
  id?: number;
  cout?: number;
  prerequisities?: string;
  diagnostic?: string;
  conclusion?: string;
  // transactions?: Transaction[];
  // personnel?: Personnel;
  // dossierMedical?: DossierMedical;
  service?: ServiceInterface;
}
