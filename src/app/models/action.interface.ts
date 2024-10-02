import {FonctionnaliteInterface} from "./fonctionnalite.interface";
import {EntiteBase} from "./entite-base";

export interface ActionInterface extends EntiteBase {
  code:string;
  description: string;
  httpVerb: HttpVerb,
  fonctionnalite: FonctionnaliteInterface;
}

export enum HttpVerb {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export const httpVerbMapping: { [key: string]: string } = {
  'GET': 'Voir',
  'POST': 'Ajouter',
  'PUT': 'Modifier',
  'DELETE': 'Supprimer'
};
