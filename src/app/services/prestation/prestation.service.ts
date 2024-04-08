import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {PrestationInterface, WeeklyPrestationStats} from "../../models/prestation.interface";
import {Observable} from "rxjs";
import {ApiResponseInterface} from "../../models/api-response.interface";
import {environment} from "src/environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class PrestationService {

  url = `${environment.apiURL}/prestation`;
  constructor(private http: HttpClient) { }

  save(prestation: PrestationInterface): Observable<ApiResponseInterface>{

    return this.http.post<ApiResponseInterface>(this.url, prestation);
  }

  update(prestation: PrestationInterface) {
    return this.http.patch<PrestationInterface>(this.url, prestation);
  }

  getPaginatedData(page: number = 0, size: number = 10): Observable<any> {
    // Création des paramètres de la requête
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());

    // Envoi de la requête GET avec les paramètres de pagination
    return this.http.get(this.url, {params});
  }

  getPaginatedFilteredData(page: number = 0,
                           size: number = 10,
                           firstName?: string,
                           lastName?: string,
                           serviceId?: number,
                           startDate?: string,
                           endDate?: string
  ): Observable<any> {
    let params = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString());

    if (firstName) {
      params = params.append('firstName', firstName);
    }
    if (lastName) {
      params = params.append('lastName', lastName);
    }
    if (serviceId !== undefined && serviceId !== null) {
      params = params.append('serviceId', serviceId.toString());
    }
    if (startDate) {
      params = params.append('startDate', startDate);
    }
    if (endDate) {
      params = params.append('endDate', endDate);
    }

    return this.http.get(this.url, {params});
  }

  getAll(){
    return this.http.get<ApiResponseInterface>(this.url+"/all")
  }

  countByStatus(): Observable<number[]> {
    return this.http.get<number[]>(this.url + '/countByStatus')
  }

  countWeeklyForAll(): Observable<WeeklyPrestationStats> {
    return this.http.get<WeeklyPrestationStats>(this.url + '/countWeeklyForAll')
  }


}
