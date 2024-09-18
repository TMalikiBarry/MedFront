import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {ApiResponseInterface} from "../../models/api-response.interface";
import {ProfilInterface} from "../../models/profil.interface";

import {UtilsService} from "../utils/utils.service";
import {Observable} from "rxjs";
import {Page} from "../../models/pagination.interface";

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http: HttpClient, private utils: UtilsService) { }
  private readonly url = `${environment.apiURL}/profil`;
  getPaginatedFilteredData(page: number = 0, size: number = 10, firstName?: string, lastName?: string,
                           telephone?: string, startDate?: Date, endDate?: Date,
                           status?: string, genre?: string, ageMin?: number, ageMax?: number) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (firstName) {
      params = params.set('firstName', firstName);
    }
    if (lastName) {
      params = params.set('lastName', lastName);
    }

    if (this.utils.numberIsDefined(ageMin!)) {
      params = params.set('ageMin', ageMin!);
    }

    if (this.utils.numberIsDefined(ageMax!)) {
      params = params.set('ageMax', ageMax!);
    }

    if (telephone) {
      params = params.set('telephone', telephone);
    }
    if (status) {
      params = params.set('status', status);
    }
    if (genre) {
      params = params.set('genre', genre);
    }
    if (startDate) {
      params = params.set('startDate', startDate.toISOString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toISOString());
    }

    return this.http.get<Page<ProfilInterface>>(this.url, {params});
  }

  getAll(){
    return  this.http.get<any>(this.url+"/all")
  }

  update( profil: ProfilInterface, profilID: number): Observable<ApiResponseInterface>
  {
    return this.http.put<ApiResponseInterface>(this.url+"/update"+`/${profilID}`, profil);
  }

  getProfilByCode(code: string): Observable<ApiResponseInterface> {
    return this.http.get<ApiResponseInterface>(`${this.url}/${code}`);
  }

  save(module: ProfilInterface): Observable<ApiResponseInterface> {

    return this.http.post<ApiResponseInterface>(this.url+"/save", module);
  }
  delete(code: string): Observable<any> {
    return this.http.delete(`${this.url}/${code}`, {responseType: 'text'});
  }
}
