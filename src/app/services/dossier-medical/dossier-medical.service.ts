import {Injectable} from '@angular/core';
import {environment} from "src/environments/environment.prod";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {DossierMedicalInterface} from "../../models/dossier-medical.interface";

@Injectable({
  providedIn: 'root'
})
export class DossierMedicalService {

  private readonly url = `${environment.apiURL}/dossierMedical`;
  constructor(private http: HttpClient) { }

  /*
    save(patient: PatientInterface): Observable<ApiResponseInterface>{

      return this.http.post<ApiResponseInterface>(this.url, patient);
    }
  */

  getPaginatedData(page: number = 0, size: number = 10): Observable<any> {
    // Création des paramètres de la requête
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());

    // Envoi de la requête GET avec les paramètres de pagination
    return this.http.get(this.url, { params: params });
  }

  getAll(): Observable<DossierMedicalInterface[]>{
    return this.http.get<DossierMedicalInterface[]>(`${this.url}/all`);
  }

  getPatientDetailsById(patientId: number): Observable<DossierMedicalInterface> {
    return this.http.get<DossierMedicalInterface>(`${this.url}/details/${patientId}`);
  }
}
