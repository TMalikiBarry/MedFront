import {Injectable} from '@angular/core';
import {environment} from "src/environments/environment.prod";
import { HttpClient, HttpParams } from "@angular/common/http";
import {ApiResponseInterface} from "../../models/api-response.interface";
import {Page} from "../../models/pagination.interface";
import {ServiceInterface} from "../../models/service.interface";

@Injectable({
  providedIn: 'root'
})
export class CliniqueServiceService {

  private readonly API_URL = environment.apiURL

  private readonly API_POLE = this.API_URL + '/poles/all'

  private readonly ENDPOINT_SERVICE = "/service"
  constructor(private http : HttpClient) { }


  save(data: ServiceInterface) {
    return this.http.post<ApiResponseInterface>(this.API_URL+this.ENDPOINT_SERVICE, data);
  }

  update(data: ServiceInterface) {
    return this.http.patch<ApiResponseInterface>(this.API_URL + this.ENDPOINT_SERVICE, data);
  }

  deleteById(data: ServiceInterface) {
    return this.http.delete<ApiResponseInterface>(this.API_URL + this.ENDPOINT_SERVICE + '/' + data.id);
  }

  getPaginatedData(page: number = 0, size: number = 10) {
    // Création des paramètres de la requête
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());

    // Envoi de la requête GET avec les paramètres de pagination
    return this.http.get<Page<ServiceInterface>>(this.API_URL + this.ENDPOINT_SERVICE, {params});
  }

  getAllService() {
    return this.http.get<ApiResponseInterface>(this.API_URL + this.ENDPOINT_SERVICE + "/all")
  }

  getServiceByPoleId(id :  number){
    return this.http.get<ApiResponseInterface>(this.API_URL + this.ENDPOINT_SERVICE + "/pole/" + id)
  }

  getServiceById(id: number) {
    return this.http.get<ApiResponseInterface>(this.API_URL + this.ENDPOINT_SERVICE + '/' + id);
  }

  getAllPoles() {
    return this.http.get<ApiResponseInterface>(this.API_POLE);
  }

}


