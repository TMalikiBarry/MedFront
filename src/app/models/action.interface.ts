import {FonctionnaliteInterface} from "./fonctionnalite.interface";

export interface ActionInterface {
  code:string;
  description?: string;
  httpVerb: HttpVerb,
  fonctionnalite: FonctionnaliteInterface;
}

export enum HttpVerb {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}
