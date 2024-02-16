import {PrestationInterface} from "./prestation.interface";
import {PatientInterface} from "./patient.interface";

export interface DossierMedicalInterface {
  id?: number;
  statut?: string;
  prestations?: PrestationInterface[];
  patient?: PatientInterface;
  allergies?: string;
  maladies?: string;
}
