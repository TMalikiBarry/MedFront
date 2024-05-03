import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";

import {ApiResponseInterface} from "../../models/api-response.interface";
import {TitreInterface} from "../../models/titre.interface";

@Injectable({
  providedIn: 'root'
})
export class TitreService {

  private readonly url = environment.apiURL + '/titre';

  constructor(private http: HttpClient) {
  }

  /*  getPaginatedData(page: number = 0, size: number = 10){
      // Création des paramètres de la requête
      let params = new HttpParams();
      params = params.append('page', page.toString());
      params = params.append('size', size.toString());

      // Envoi de la requête GET avec les paramètres de pagination
      return this.http.get<Page<PersonnelInterface>>(this.url, {params});
    }*/

  getAll() {
    return this.http.get<ApiResponseInterface>(this.url + '/all');
  }

  save(t: TitreInterface) {
    return this.http.post<ApiResponseInterface>(this.url + '/save', t);
  }

  update(t: TitreInterface) {
    return this.http.put<ApiResponseInterface>(this.url + '/update', t);
  }
}
