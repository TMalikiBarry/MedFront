import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {ApiResponseInterface} from "../../models/api-response.interface";
import {ProfilInterface} from "../../models/profil.interface";
import {Page} from "../../models/pagination.interface";
import {PersonnelInterface} from "../../models/personnel.interface";
import {ActionInterface} from "../../models/action.interface";

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private readonly url = environment.apiURL + '/profil';

  private readonly urlAction = `${environment.apiURL}/action/allPresent`;

  constructor(private http: HttpClient) {
  }

  getPaginatedData(page: number = 0, size: number = 10) {
    // Création des paramètres de la requête
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());

    // Envoi de la requête GET avec les paramètres de pagination
    return this.http.get<Page<PersonnelInterface>>(this.url, {params});
  }

  getAllActions() {
    return this.http.get<ActionInterface[]>(this.urlAction);
  }

  save(p: ProfilInterface) {
    return this.http.post<ApiResponseInterface>(this.url + '/save', p);
  }

  update(p: ProfilInterface, pID: number) {
    return this.http.put(this.url + '/update/' + pID, p);
  }
}
