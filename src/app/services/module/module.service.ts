import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {UtilsService} from "../utils/utils.service";
import {environment} from "src/environments/environment.prod";
import {ModuleInterface} from "../../models/module.interface";
import {ApiResponseInterface} from "../../models/api-response.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http: HttpClient, private utils: UtilsService) { }

  private readonly url = `${environment.apiURL}/module`;

  getPaginatedFilteredData(page: number = 0, size: number = 10, code?: string) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (code) {
      params = params.set('code', code);
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

  getModuleByCode(code: string): Observable<ApiResponseInterface> {
    return this.http.get<ApiResponseInterface>(`${this.url}/${code}`);
  }

  save(module: ModuleInterface): Observable<ApiResponseInterface> {

    return this.http.post<ApiResponseInterface>(this.url, module);
/*      .pipe(
        catchError(this.handleError)
      );*/
 //   ;
  }

  delete(code: string): Observable<any> {
    return this.http.delete(`${this.url}/${code}`, {responseType: 'text'});
  }

/*  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client ou réseau
      console.error('Une erreur s\'est produite:', error.error.message);
    } else {
      // Le backend a renvoyé un code d'erreur
      return throwError({
        errorCode: error.status,
        errorMessage: error.error.message || 'Erreur inconnue'
      });
    }
    return throwError('Une erreur inconnue est survenue.');
  }*/
}
