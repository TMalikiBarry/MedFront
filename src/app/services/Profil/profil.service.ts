import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {ApiResponseInterface} from "../../models/api-response.interface";
import {ProfilInterface} from "../../models/profil.interface";
import {Observable} from "rxjs";
import {Page} from "../../models/pagination.interface";
import {ActionInterface} from "../../models/action.interface";
import {UtilsService} from "../utils/utils.service";

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  private actions: ActionInterface[] | undefined;
  constructor(private http: HttpClient, private utils: UtilsService) { }
  private readonly url = `${environment.apiURL}/profil`;

  private readonly urlAction = `${environment.apiURL}/action/allPresent`;



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

  getAllActions() {
    return this.http.get<ActionInterface[]>(this.urlAction);
  }

  getAll(){
    return  this.http.get<any>(this.url+"/all")
  }

  getProfilByCode(code: string){
    return this.http.get<ApiResponseInterface>(`${this.url}/${code}`);
  }


  save(p: ProfilInterface) {
    return this.http.post<ApiResponseInterface>(this.url + '/save', p);
  }

  update(p: ProfilInterface, pID: number) {
    return this.http.put(this.url + '/update/' + pID, p);
  }

  delete(code: string){
    return this.http.delete(`${this.url}/${code}`, {responseType: 'text'});
  }
  getActionsByProfilCode(profilCode: string): Observable<ApiResponseInterface> {

    return   this.http.get<ApiResponseInterface>(`${this.url}/${profilCode}/actions`);
  }

  getActions(): ActionInterface[] | undefined {
    return this.actions;
  }

  setActions(value: ActionInterface[]) {
    this.actions = value;
  }
}
