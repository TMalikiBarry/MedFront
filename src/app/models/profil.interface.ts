import {EntiteBase} from "./entite-base";
import {ActionInterface} from "./action.interface";

export interface ProfilInterface extends EntiteBase{
  id?: number;
  libelle?: string;
  code: string;
  welcomeBookmark?: string;
  actions?: ActionInterface[];
}

export enum EProfil {
  SUPERADMINISTRATEUR,
  ADMINISTRATEUR,
  PROFESSEUR,
  DOCTEUR,
  MEDECIN,
  INFIRMIER,  CAISSIER,

  PATIENT,
  RECEPTIONNISTE,
  RECEPTIONNISTE_CAISSIER,
  COMPTABLE,
  SAGE_FEMME,
  GYNECOLOGUE,
  MANAGER_BU
}

export const SUPERADMINISTRATEUR = "SUPERADMINISTRATEUR";
