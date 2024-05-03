import {AccesInterface} from "./acces.interface";

export interface PersonneInterface {
  id?: number;
  nom: string;
  prenom: string;
  adresse: string;
  genre: EGenre;
  hasAlreadyConnected?: boolean;
  telephone?: string;
  email?: string;
  datenaissance?: string;
  numeroCNI?: string;
  numeroPassport?: string ;
  age?: string;
  otp?: string;
  dategenerationOTP?: string;
  dateValidationOTP?: string;
  acces?: AccesInterface;
  supprime?: boolean
  dateCreation?: string,
  dateModification?: string
}

export enum EGenre {
  M = 'M',
  F = 'F'
}
