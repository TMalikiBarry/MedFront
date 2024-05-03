import {PrestationInterface} from "./prestation.interface";
import {PatientInterface} from "./patient.interface";
import {EntiteBase} from "./entite-base";
import {RendezVousInterface} from "./rendez-vous.interface";

export interface DossierMedicalInterface extends EntiteBase {
  id?: number;
  statut?: string;
  prestations?: PrestationInterface[];
  rendezVousList?: RendezVousInterface[];
  patient?: PatientInterface;
  allergies?: string;
  maladies?: string;
  supprime?: boolean;
}
