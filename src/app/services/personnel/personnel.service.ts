import {Injectable} from '@angular/core';
import {environment} from "src/environments/environment.prod";
import { HttpClient, HttpParams } from "@angular/common/http";
import {ApiResponseInterface} from "../../models/api-response.interface";
import {PersonnelInterface} from "../../models/personnel.interface";
import {Page} from "../../models/pagination.interface";

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  private readonly API_URL = environment.apiURL

  private readonly PROFILS_URL = this.API_URL + '/profil/allPresent'
  private readonly TITRE_URL = this.API_URL + '/titre/all'
  private readonly POLE_URL = this.API_URL + '/poles/all'

  private readonly ENDPOINT_PERSONNEL = "/personnel"

  constructor(private http : HttpClient) { }

  getAllPersonnel(){
    return this.http.get<ApiResponseInterface>(this.API_URL + this.ENDPOINT_PERSONNEL + "/all")
  }

  getPaginatedData(page: number = 0, size: number = 10) {
    // Création des paramètres de la requête
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());

    // Envoi de la requête GET avec les paramètres de pagination
    return this.http.get<Page<PersonnelInterface>>(this.API_URL + this.ENDPOINT_PERSONNEL, {params});
  }

  getPersonnelById(id : number){
    return this.http.get<ApiResponseInterface>(this.API_URL + this.ENDPOINT_PERSONNEL + '/' + id);
  }

  save(data: PersonnelInterface) {
    return this.http.post<ApiResponseInterface>(this.API_URL+this.ENDPOINT_PERSONNEL, data);
  }

  update(data: PersonnelInterface) {
    return this.http.patch<ApiResponseInterface>(this.API_URL + this.ENDPOINT_PERSONNEL + '/update/' + data.id, data);
  }

  deleteById(data: PersonnelInterface) {
    return this.http.delete<ApiResponseInterface>(this.API_URL + this.ENDPOINT_PERSONNEL + '/' + data.id);
  }

  listAllPresentProfils() {
    return this.http.get<ApiResponseInterface>(this.PROFILS_URL);
  }

  listAllTitres() {
    return this.http.get<ApiResponseInterface>(this.TITRE_URL);
  }

  listAllPoles() {
    return this.http.get<ApiResponseInterface>(this.POLE_URL);
  }

}
