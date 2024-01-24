import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiResponseInterface} from "../../models/api-response.interface";

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  readonly API_URL =  environment.apiURL

  readonly ENDPOINT_RDV = "/rendezVous"

  constructor(private http : HttpClient) { }

  getAllRdv() {
    return this.http.get<any>(this.API_URL+this.ENDPOINT_RDV+"/all")
  }

  getAllRdvPagination(page: number = 0, size: number = 5){
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());
    return this.http.get<any>(this.API_URL+this.ENDPOINT_RDV)
  }

  getRdvById(id : number){
    return this.http.get<ApiResponseInterface>(this.API_URL+this.ENDPOINT_RDV+"/"+id);
  }

  saveRdv(data : any){
    return this.http.post<ApiResponseInterface>(this.API_URL+this.ENDPOINT_RDV, data);
  }

  updateRdv(data : any){
    return this.http.put<ApiResponseInterface>(this.API_URL+this.ENDPOINT_RDV,data);
  }

  deleteRdv(id : any){
    return this.http.delete<ApiResponseInterface>(this.API_URL+this.ENDPOINT_RDV+"/delete/"+id);
  }
}
