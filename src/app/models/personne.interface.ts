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
  datenaissance: Date;
  numeroCNI: string;
  numeroPassport: string;
  age: string;
  otp: string;
  dategenerationOTP: Date;
  dateValidationOTP: Date;
  acces: AccesInterface;
}
