import {Injectable} from '@angular/core';
import {environment} from "src/environments/environment.prod";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PersonneService {

  private readonly API_URL = environment.apiURL

  private readonly ENDPOINT_PERSONNE = "/personne/"

  constructor(private http : HttpClient) { }

  getAllPersonne(){
    return this.http.get<any>(this.API_URL+this.ENDPOINT_PERSONNE)
  }

  savePersonne(data : any){
    return this.http.post<any>(this.API_URL+this.ENDPOINT_PERSONNE+"save", data)
  }

  getPersonneById(id : number){
    return this.http.get<any>(this.API_URL+this.ENDPOINT_PERSONNE+id)
  }

}
