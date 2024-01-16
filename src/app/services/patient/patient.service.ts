import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponseInterface } from '../../models/api-response.interface';
import { PatientInterface } from '../../models/patient.interface';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PatientService {

  private dossierMedicalEndpoint = `${environment.apiURL}/dossierMedical`;
  private patientsEndpoint = `${environment.apiURL}/patients/all`;

  constructor(private http: HttpClient) { }

  // Ajouter un patient via l'endpoint /dossierMedical
  addPatient(patient: PatientInterface): Observable<ApiResponseInterface> {
    const body = {
      statut: 'ACTIF',
      patient: patient,
    };

    return this.http.post<ApiResponseInterface>(this.dossierMedicalEndpoint, body);
  }

  // Récupérer la liste de tous les patients via l'endpoint /patients/all
  getAllPatients(): Observable<PatientInterface[]> {
    return this.http.get<PatientInterface[]>(this.patientsEndpoint);
  }
}
