import {AccesInterface} from "./acces.interface";

export interface PersonneInterface {
  id: number;
  nom: string;
  prenom: string;
  adresse: string;
  genre: string;
  hasAlreadyConnected: boolean;
  telephone: string;
  email: string;
  datenaissance: string;
  numeroCNI: string;
  numeroPassport: string |null;
  age: string;
  otp: string|null;
  dategenerationOTP: string|null;
  dateValidationOTP: string|null;
  acces: AccesInterface;
  supprime: boolean
  dateCreation: string | null,
  dateModification : string | null
}
