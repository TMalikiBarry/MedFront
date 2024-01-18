import {PersonneInterface} from "./personne.interface";
import {RendezVousInterface} from "./rendez-vous.interface";
import {PersonnelInterface} from "./personnel.interface";
import {DossierMedicalInterface} from "./dossier-medical.interface";

export interface PatientInterface {
  id?: number
  groupeSanguin : string
  donneurOrgane : Boolean
  contactEnCasUrgent : string
  rendezVous ?: RendezVousInterface[]
  personne : PersonneInterface
  personnel : PersonnelInterface
  dossiermedical : DossierMedicalInterface[]

}
