import {ProfilInterface} from "./profil.interface";
import {LogAction} from "./log-action";

export interface AccesInterface {
  id?: number;
  login: string;
  password?: string;
  oldPassword?: string;
  status?: EStatusAcces;
  dateLastPwdUpdate?: string;
  hasAlreadyConnected?: boolean;
  logActions?: LogAction[];
  profil: ProfilInterface;
  supprime?: boolean;
  dateCreation?: string;
  dateModification?: string;
}

export enum EStatusAcces {
  // Définissez vos valeurs enum ici
  ACTIF, INACTIF
}
