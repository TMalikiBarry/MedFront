import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import {UtilsService} from "../utils/utils.service";
import {environment} from "../../../environments/environment.prod";
import {ApiResponseInterface} from "../../models/api-response.interface";
import {ModuleInterface} from "../../models/module.interface";
import {Observable} from "rxjs";
import {FonctionnaliteInterface} from "../../models/fonctionnalite.interface";

@Injectable({
  providedIn: 'root'
})
export class FonctionnaliteService {
  constructor(private http: HttpClient, private utils: UtilsService) { }
  private readonly url = `${environment.apiURL}/fonctionnalite`;
  getPaginatedFilteredData(page: number = 0, size: number = 10, code?: string, codeModule?: string) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (code) {
      params = params.set('code', code);
    }
    if (codeModule) {
      params = params.set('codeModule', codeModule);
    }
    return this.http.get<ApiResponseInterface>(this.url, {params});
  }

  getAll(){
    return  this.http.get<any>(this.url+"/all")
  }

  update(module: ModuleInterface): Observable<ApiResponseInterface>
  {
    return this.http.patch<ApiResponseInterface>(this.url, module);
  }

  getFonctionalityByCode(code: string): Observable<ApiResponseInterface> {
    return this.http.get<ApiResponseInterface>(`${this.url}/${code}`);
  }

  save(module: FonctionnaliteInterface): Observable<ApiResponseInterface> {

    return this.http.post<ApiResponseInterface>(this.url, module);
  }
  delete(code: string): Observable<any> {
    return this.http.delete(`${this.url}/${code}`, {responseType: 'text'});
  }
}
