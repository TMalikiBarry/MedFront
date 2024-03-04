import {WeeklyDataStat} from "./weekly-data-stat";
import {PatientInterface} from "./patient.interface";
import {RendezVousInterface} from "./rendez-vous.interface";

export interface DashboardDataInterface {
  nombrePatients: number;
  nombreDocteurs: number;
  nombrePoles: number;
  anciensPatientsStats: WeeklyDataStat;
  nouveauxPatientsStats: WeeklyDataStat;
  transactionStats: WeeklyDataStat;
  nouveauxPatients: PatientInterface[];
  rdvsDuJour: RendezVousInterface[];
}
