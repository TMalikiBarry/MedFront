import {Injectable} from '@angular/core';
import {environment} from "src/environments/environment.prod";
import {ApiResponseInterface} from "../../models/api-response.interface";
import { HttpClient, HttpParams } from "@angular/common/http";
import {PoleInterface} from "../../models/pole.interface";
import {Page} from "../../models/pagination.interface";

@Injectable({
  providedIn: 'root'
})
export class PoleService {

  private readonly API_URL = environment.apiURL
  private readonly API_PERSONNEL = this.API_URL + '/personnel/all';

  private readonly ENDPOINT_POLE = "/poles"

  constructor(private http : HttpClient) { }

  getAllPole(){
    return this.http.get<ApiResponseInterface>(this.API_URL + this.ENDPOINT_POLE + "/all")
  }

  getPoleById(id : number){
    return this.http.get<ApiResponseInterface>(this.API_URL + this.ENDPOINT_POLE + '/' + id);
  }

  save(data: PoleInterface) {
    return this.http.post<ApiResponseInterface>(this.API_URL+this.ENDPOINT_POLE, data);
  }

  update(data: PoleInterface) {
    return this.http.patch<ApiResponseInterface>(this.API_URL + this.ENDPOINT_POLE, data);
  }

  deleteById(data: PoleInterface) {
    return this.http.delete<ApiResponseInterface>(this.API_URL + this.ENDPOINT_POLE + '/' + data.id);
  }

  getPaginatedData(page: number = 0, size: number = 10) {
    // Création des paramètres de la requête
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());

    // Envoi de la requête GET avec les paramètres de pagination
    return this.http.get<Page<PoleInterface>>(this.API_URL + this.ENDPOINT_POLE, {params});
  }

  getAllPresentPersonnel() {
    return this.http.get<ApiResponseInterface>(this.API_PERSONNEL);
  }
}
