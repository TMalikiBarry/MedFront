import {Injectable} from '@angular/core';
import {environment} from "src/environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {ApiResponseInterface} from "../../models/api-response.interface";

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  readonly API_URL = environment.apiURL

  readonly ENDPOINT_PERSONNEL = "/personnel/"

  constructor(private http : HttpClient) { }

  getAllPersonnel(){
    return this.http.get<ApiResponseInterface>(this.API_URL+this.ENDPOINT_PERSONNEL+"all")
  }

  getPersonnelById(id : number){
    return this.http.get<ApiResponseInterface>(this.API_URL+this.ENDPOINT_PERSONNEL+id);
  }

  savePersonnel(data : any){
    return this.http.post<ApiResponseInterface>(this.API_URL+this.ENDPOINT_PERSONNEL, data);
  }
}
