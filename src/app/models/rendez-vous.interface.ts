import {ServiceInterface} from "./service.interface";
import {PersonnelInterface} from "./personnel.interface";
import {PatientInterface} from "./patient.interface";

export interface RendezVousInterface {
  id?: number
  dateRv : Date;
  statut ?: string;
  duree ?: number;
  remarques ?: string;
  rappels ?: string;
  personnel ?: PersonnelInterface;
  patient : PatientInterface;
  service : ServiceInterface;
}
