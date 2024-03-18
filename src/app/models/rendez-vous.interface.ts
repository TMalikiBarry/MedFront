import {ServiceInterface} from "./service.interface";
import {PersonnelInterface} from "./personnel.interface";
import {PatientInterface} from "./patient.interface";

export interface RendezVousInterface {
  id?: number
  dateRv : Date;
  statut?: RDVStatus;
  duree ?: number;
  remarques ?: string;
  rappels ?: string;
  personnel : PersonnelInterface;
  patient : PatientInterface;
  service : ServiceInterface;
  personnelCreateur ?: PersonnelInterface
}

export enum RDVStatus {
  CREATED = 'CREATED',
  VALIDATED = 'VALIDATED',
  CANCELED = 'CANCELED'
}
