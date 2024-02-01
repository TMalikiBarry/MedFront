import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ApiResponseInterface} from "../../models/api-response.interface";

@Injectable({
  providedIn: 'root'
})
export class ParametreService {

  readonly API_URL = environment.apiURL;
  readonly ENDPOINT_PARAMETRE = '/parametres'

  constructor(private http : HttpClient) { }

  saveParametre(data : any){
    return this.http.post(this.API_URL+this.ENDPOINT_PARAMETRE, data)
  }
  getParametreByCode(code : string){
    return this.http.get<ApiResponseInterface>(this.API_URL+this.ENDPOINT_PARAMETRE+"/"+code)
  }
  getAllParametre(){
    return this.http.get<ApiResponseInterface>(this.API_URL+this.ENDPOINT_PARAMETRE)
  }
}
