import {ServiceInterface} from "./service.interface";
import {PersonnelInterface} from "./personnel.interface";
import {PatientInterface} from "./patient.interface";
import {EntiteBase} from "./entite-base";
import {WeeklyDataStat} from "./weekly-data-stat";

export interface RendezVousInterface extends EntiteBase {
  id?: number
  dateRv : Date;
  statut?: RDVStatus;
  motif?: string;
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

export interface WeeklyRDVStats {
  createdRDVStats: WeeklyDataStat;
  validatedRDVStats: WeeklyDataStat;
  canceledRDVStats: WeeklyDataStat;
}
