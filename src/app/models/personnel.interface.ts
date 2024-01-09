import {PrestationInterface} from "./prestation.interface";
import {PatientInterface} from "./patient.interface";

export interface PersonnelInterface {
  id: number;
  statut?: string;
  prestations?: PrestationInterface[];
  patient?: PatientInterface;
}
