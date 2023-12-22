import {PersonneInterface} from "./personne.interface";

export interface AuthInterface {
  username: string;
  token: string;
  fullName: string;
  person: PersonneInterface;
  password: string;
}
