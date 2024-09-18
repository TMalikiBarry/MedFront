import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {ApiResponseInterface} from "../../models/api-response.interface";
import {AccesInterface} from "../../models/acces.interface";

@Injectable({
  providedIn: 'root'
})
export class AccesService {

  private readonly url = environment.apiURL + '/acces';

  constructor(private http: HttpClient) {
  }

  getPaginatedData(page: number = 0, size: number = 10) {

    let params = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString());

    return this.http.get<ApiResponseInterface>(this.url, {params});
  }

  getAll() {
    return this.http.get<ApiResponseInterface>(`${this.url}/allPresent`);
  }

  save(acces: AccesInterface) {
    return this.http.post<ApiResponseInterface>(this.url, acces);
  }

  update(acces: AccesInterface, accesId: number) {
    return this.http.patch<ApiResponseInterface>(`${this.url}/update/${accesId}`, acces);
  }

  delete(accesId: number) {
    return this.http.delete<ApiResponseInterface>(`${this.url}/delete/${accesId}`);
  }

}
