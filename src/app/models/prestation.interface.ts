import {EntiteBase} from "./entite-base";
import {ServiceInterface} from "./service.interface";
import {DossierMedicalInterface} from "./dossier-medical.interface";
import {PersonnelInterface} from "./personnel.interface";

export interface PrestationInterface extends EntiteBase {
  id?: number;
  cout?: number;
  prerequisities?: string;
  diagnostic?: string;
  conclusion?: string;
  // transactions?: Transaction[];
  personnel?: PersonnelInterface;
  dossierMedical?: DossierMedicalInterface;
  service?: ServiceInterface;
}
