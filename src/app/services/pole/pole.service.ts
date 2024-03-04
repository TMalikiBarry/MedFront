import {Injectable} from '@angular/core';
import {environment} from "src/environments/environment";
import {ApiResponseInterface} from "../../models/api-response.interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PoleService {

  readonly API_URL = environment.apiURL

  readonly ENDPOINT_POLE = "/poles/"

  constructor(private http : HttpClient) { }

  getAllPole(){
    return this.http.get<ApiResponseInterface>(this.API_URL+this.ENDPOINT_POLE+"all")
  }

  getPoleById(id : number){
    return this.http.get<ApiResponseInterface>(this.API_URL+this.ENDPOINT_POLE+id);
  }

  savePole(data : any){
    return this.http.post<ApiResponseInterface>(this.API_URL+this.ENDPOINT_POLE, data);
  }
}
