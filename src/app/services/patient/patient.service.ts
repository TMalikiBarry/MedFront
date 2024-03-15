import {Injectable} from '@angular/core';
import {environment} from "src/environments/environment.prod";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponseInterface} from "../../models/api-response.interface";
import {DossierMedicalInterface} from "../../models/dossier-medical.interface";
import {PatientInterface} from "../../models/patient.interface";
import {WeeklyDataStat} from "../../models/weekly-data-stat";
import {Page} from "../../models/pagination.interface";

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

  getPaginatedFilteredData(page: number = 0, size: number = 10, firstName?: string, lastName?: string,
                           ageRange?: number[], telephone?: string, startDate?: Date, endDate?: Date,
                           status?: string, genre?: string) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (firstName) {
      params = params.set('firstName', firstName);
    }
    if (lastName) {
      params = params.set('lastName', lastName);
    }
    let ageMin = 0;
    let ageMax = 140;
    if (ageRange) {
      ageMin = ageRange [0];
      ageMax = ageRange [1];

    }
    params = params.set('ageMin', ageMin);
    params = params.set('ageMax', ageMax);

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

    return this.http.get<Page<PatientInterface>>(this.url, {params});
  }

  getAll(){
    return  this.http.get<any>(this.url+"/all")
  }

  getDossierByPatientId(patientId: number): Observable<DossierMedicalInterface> {
    return this.http.get<DossierMedicalInterface>(`${this.urlDossier}/patient/${patientId}`);
  }

  updatePatient(data: any) {
    return this.http.put<ApiResponseInterface>(this.url,data);
  }

  update(dossier: DossierMedicalInterface) {
    return this.http.patch<DossierMedicalInterface>(this.urlDossier, dossier);
  }

  getPatientById(patientId: number): Observable<PatientInterface> {
    return this.http.get<PatientInterface>(`${this.url}/${patientId}`);
  }

  getWeeklyPatientsInscrits(): Observable<WeeklyDataStat> {
    return this.http.get<WeeklyDataStat>(this.patientStatUrl);
  }

  getWeeklyPatientsVenus(): Observable<WeeklyDataStat> {
    return this.http.get<WeeklyDataStat>(this.rdvStatUrl);
  }
}
