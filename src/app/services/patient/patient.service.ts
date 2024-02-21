import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponseInterface} from "../../models/api-response.interface";
import {DossierMedicalInterface} from "../../models/dossier-medical.interface";
import {PatientInterface} from "../../models/patient.interface";
import {WeeklyPatientStat} from "../../models/weekly-patient-stat";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private readonly url = `${environment.apiURL}/patients`;
  private readonly urlDossier = `${environment.apiURL}/dossierMedical`;
  private readonly patientStatUrl = `${environment.apiURL}/patients/stats`;
  private readonly rdvStatUrl = `${environment.apiURL}/rendezVous/stats`;
  constructor(private http: HttpClient) { }

  save(dossier: DossierMedicalInterface): Observable<ApiResponseInterface> {
    /*    const dossier: DossierMedicalInterface = {
          patient,
          statut: "ACTIF"
        }*/
    return this.http.post<ApiResponseInterface>(this.urlDossier, dossier);
  }

  getPaginatedData(page: number = 0, size: number = 10): Observable<any> {
    // Création des paramètres de la requête
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', size.toString());

    // Envoi de la requête GET avec les paramètres de pagination
    return this.http.get(this.url, { params: params });
  }

  getAll(){
    return  this.http.get<any>(this.url+"/all")
  }

  UpddatePatient(data : any){
    return this.http.put<ApiResponseInterface>(this.url,data);
  }
  getPatientById(patientId: number): Observable<PatientInterface> {
    return this.http.get<PatientInterface>(`${this.url}/${patientId}`);
  }

  getWeeklyPatientsInscrits(): Observable<WeeklyPatientStat> {
    return this.http.get<WeeklyPatientStat>(this.patientStatUrl);
  }

  getWeeklyPatientsVenus(): Observable<WeeklyPatientStat> {
    return this.http.get<WeeklyPatientStat>(this.rdvStatUrl);
  }
}
