import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {PrestationInterface} from "../../models/prestation.interface";
import {Observable} from "rxjs";
import {ApiResponseInterface} from "../../models/api-response.interface";
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class PrestationService {

  url = `${environment.apiURL}/prestation`;
  constructor(private http: HttpClient) { }

  save(prestation: PrestationInterface): Observable<ApiResponseInterface>{

    return this.http.post<ApiResponseInterface>(this.url, prestation);
  }

  getPaginatedData(page: number = 0, size: number = 5): Observable<any> {
    // Création des paramètres de la requête
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());

    // Envoi de la requête GET avec les paramètres de pagination
    return this.http.get(this.url, { params: params });
  }

  getAll(){
    return this.http.get<ApiResponseInterface>(this.url+"/all")
  }
}
