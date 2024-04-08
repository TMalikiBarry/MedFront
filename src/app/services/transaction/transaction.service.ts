import {Injectable} from '@angular/core';
import {environment} from "src/environments/environment.prod";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiResponseInterface} from "../../models/api-response.interface";
import {Observable} from "rxjs";
import {MoyenPayment, TransactionInterface, TransactionStatus} from "../../models/transaction.interface";
import {PrestationInterface} from "../../models/prestation.interface";
import {UtilsService} from "../utils/utils.service";
import {Page} from "../../models/pagination.interface";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly API_URL = environment.apiURL

  private readonly ENDPOINT_TRANSACTION = "/transactions/"

  constructor(private http: HttpClient, private utils: UtilsService) {
  }

  saveTransaction(data: any, moyen?: string) {
    let params = new HttpParams();
    if(moyen)
      params = params.append('moyen', moyen.toString());
    return this.http.post<ApiResponseInterface>(this.API_URL+"/transactions", data , {params : params})
  }
  getAllTransaction(){
    return this.http.get<ApiResponseInterface>(this.API_URL+"/transactions/all")
  }

  getAllTransactionPage(page: number = 0, size: number = 10, id?: number, prestationID?: number, dossierMedicID?: number,
                        serviceID?: number, montantMin?: number, montantMax?: number, status?: string,
                        moyenPaiement?: string, startDate?: string, endDate?: string) {

    let params = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString());

    // Ajouter les paramètres facultatifs s'ils sont définis
    if (this.utils.numberIsDefined(id!)) params = params.append('id', id!.toString());
    if (this.utils.numberIsDefined(prestationID!)) params = params.append('prestationID', prestationID!.toString());
    if (this.utils.numberIsDefined(dossierMedicID!)) params = params.append('dossierMedicID', dossierMedicID!.toString());
    if (this.utils.numberIsDefined(serviceID!)) params = params.append('serviceID', serviceID!.toString());
    if (this.utils.numberIsDefined(montantMin!)) params = params.append('montantMin', montantMin!.toString());
    if (this.utils.numberIsDefined(montantMax!)) params = params.append('montantMax', montantMax!.toString());
    if (status) params = params.append('status', status);
    if (moyenPaiement) params = params.append('moyenPaiement', moyenPaiement);
    if (startDate) params = params.append('startDate', startDate);
    if (endDate) params = params.append('endDate', endDate);

    return this.http.get<Page<TransactionInterface>>(this.API_URL + "/transactions", {params: params});
  }

  getWeeklyTransactionAmountStats(moyenPayment?: MoyenPayment): Observable<any> {
    let params = new HttpParams();
    if (moyenPayment) {
      params = params.append("moyenPaiement", moyenPayment);
    }
    return this.http.get(`${this.API_URL}/transactions/stats`, {params});
  }

  getAllCountTransaction(){
    return this.http.get(this.API_URL+"/transactions/countAll")
  }

  getAllPrestations() {
    return this.http.get<PrestationInterface[]>(`${this.API_URL}/prestation/all`)
  }

  getCountTransactionByMoyen(){
    let params = new HttpParams()
      .append('paymentMethods','ORANGE_MONEY,WAVE,FREE_MONEY,CASH')
    return this.http.get(this.API_URL+"/transactions/countByPaymentMethods", {params: params})
  }

  getTransactionByID(id: number) {
    return this.http.get<TransactionInterface>(`${this.API_URL}${this.ENDPOINT_TRANSACTION}${id}`)
  }
  getCountTransactionCash(){
    let params = new HttpParams()
      .append('paymentMethods','CASH')
    return this.http.get<ApiResponseInterface>(this.API_URL+"/transactions/countByPaymentMethods", {params: params})
  }

  countByStatus(status?: TransactionStatus): Observable<number[]> {
    let params = new HttpParams();
    if (status) params = params.append('statutTransaction', status)
    return this.http.get<number[]>(this.API_URL + '/transactions/countByStatus', {params})
  }
}
