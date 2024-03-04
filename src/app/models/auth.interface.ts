import {PersonneInterface} from "./personne.interface";

export interface AuthInterface {
  username: string;
  email: string;
  role: string;
  token: string;
  fullName: string;
  personne: PersonneInterface;
  password: string;
}
