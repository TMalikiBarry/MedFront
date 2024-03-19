import {Injectable} from '@angular/core';
import {environment} from "src/environments/environment.prod";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiResponseInterface} from "../../models/api-response.interface";
import {PatientInterface} from "../../models/patient.interface";

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  readonly API_URL =  environment.apiURL

  readonly ENDPOINT_RDV = "/rendezVous"

  constructor(private http : HttpClient) { }

  getAllRdv() {
    return this.http.get<any>(this.API_URL+this.ENDPOINT_RDV+"/all")
  }

  getAllRdvPagination(page: number = 0, size: number = 10, firstName ?: string, lastname ?: string,
                      statut ?: string, serviceId ?: number, startDate?: string, endDate?: string) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if(lastname)
      params = params.append('lastname',lastname.toString())

    if(firstName)
      params = params.append('firstName',firstName.toString())

    if (statut)
      params = params.append('statut', statut.toString())

    if(serviceId)
      params = params.append('serviceId',serviceId)

    if (startDate)
      params = params.append('startDate', startDate)

    if(endDate)
      params = params.append('endDate', endDate)

    return this.http.get<any>(this.API_URL+this.ENDPOINT_RDV,{ params: params })
  }

  getRdvFiltre(){
    let params = new HttpParams();
    return this.http.get<any>(this.API_URL+this.ENDPOINT_RDV,{params: params})
  }

  getRdvById(id : number){
    return this.http.get<ApiResponseInterface>(this.API_URL+this.ENDPOINT_RDV+"/"+id);
  }

  saveRdv(data : any){
    return this.http.post<ApiResponseInterface>(this.API_URL+this.ENDPOINT_RDV, data);
  }

  getAllPatients() {
    return this.http.get<PatientInterface[]>(`${this.API_URL}/patients/all`)
  }

  updateRdv(data : any){
    return this.http.put<ApiResponseInterface>(this.API_URL+this.ENDPOINT_RDV,data);
  }

  deleteRdv(id : any){
    return this.http.delete<ApiResponseInterface>(this.API_URL+this.ENDPOINT_RDV+"/delete/"+id);
  }
}
