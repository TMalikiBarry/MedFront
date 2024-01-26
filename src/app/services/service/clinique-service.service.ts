import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {ApiResponseInterface} from "../../models/api-response.interface";

@Injectable({
  providedIn: 'root'
})
export class CliniqueServiceService {

  readonly API_URL = environment.apiURL

  readonly ENDPOINT_SERVICE = "/service/"
  constructor(private http : HttpClient) { }

  getAllService(){
    return this.http.get<ApiResponseInterface>(this.API_URL+this.ENDPOINT_SERVICE+"all")
  }

  getServiceById(id : number){
    return this.http.get<ApiResponseInterface>(this.API_URL+this.ENDPOINT_SERVICE+id);
  }

  saveService(data : any){
    return this.http.post<ApiResponseInterface>(this.API_URL+this.ENDPOINT_SERVICE, data);
  }

  getServiceByPoleId(id :  number){
    return this.http.get<ApiResponseInterface>(this.API_URL+this.ENDPOINT_SERVICE+"pole/"+id)
  }
}
