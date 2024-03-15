import {PrestationInterface} from "./prestation.interface";
import {PatientInterface} from "./patient.interface";
import {EntiteBase} from "./entite-base";

export interface DossierMedicalInterface extends EntiteBase {
  id?: number;
  statut?: string;
  prestations?: PrestationInterface[];
  patient?: PatientInterface;
  allergies?: string;
  maladies?: string;
  supprime?: boolean;
}
