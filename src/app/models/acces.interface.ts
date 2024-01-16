import {ProfilInterface} from "./profil.interface";
import {LogAction} from "./log-action";

export interface AccesInterface {
  id: number;
  login: string;
  password: string;
  oldPassword: string |null;
  status: EStatusAcces |null;
  dateLastPwdUpdate: string |null;
  hasAlreadyConnected: boolean |null;
  logActions?: LogAction[];
  profil: ProfilInterface | null;
  supprime?: boolean;
  dateCreation : string | null;
  dateModification?: string;
}

export enum EStatusAcces {
  // Définissez vos valeurs enum ici
  ACTIF, INACTIF
}
