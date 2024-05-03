import {EntiteBase} from "./entite-base";
import {ServiceInterface} from "./service.interface";
import {DossierMedicalInterface} from "./dossier-medical.interface";
import {PersonnelInterface} from "./personnel.interface";
import {WeeklyDataStat} from "./weekly-data-stat";

export interface PrestationInterface extends EntiteBase {
  personnelCreateur?: PersonnelInterface;
  id?: number;
  cout?: number;
  montant?: number;
  prerequisities?: string;
  diagnostic?: string;
  conclusion?: string;
  prestationStatut?: PrestationStatut;
  // transactions?: Transaction[];
  personnel?: PersonnelInterface;
  dossierMedical?: DossierMedicalInterface;
  service?: ServiceInterface;
  motif?: string;
}

export enum PrestationStatut {
  NOTPAID = 'NOTPAID',
  PAID = 'PAID',
  CANCELED = 'CANCELED'
}

export interface WeeklyPrestationStats {
  notPaidPrestationStats: WeeklyDataStat;
  paidPrestationStats: WeeklyDataStat;
  canceledPrestationStats: WeeklyDataStat;
}
