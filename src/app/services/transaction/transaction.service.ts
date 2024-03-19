import {Injectable} from '@angular/core';
import {environment} from "src/environments/environment.prod";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiResponseInterface} from "../../models/api-response.interface";
import {Observable} from "rxjs";
import {MoyenPayment} from "../../models/transaction.interface";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private readonly API_URL = environment.apiURL

  private readonly ENDPOINT_TRANSACTION = "/transactions/"

  constructor(private http : HttpClient) { }

  saveTransaction(data: any, moyen?: string) {
    let params = new HttpParams();
    if(moyen)
      params = params.append('moyen', moyen.toString());
    return this.http.post<ApiResponseInterface>(this.API_URL+"/transactions", data , {params : params})
  }
  getAllTransaction(){
    return this.http.get<ApiResponseInterface>(this.API_URL+"/transactions/all")
  }
  getAllTransactionPage(page: number = 0,
                        size: number = 10) :Observable<any> {
    let params = new HttpParams()
      .append('page', page.toString())
      .append('size', size.toString());
    return this.http.get(this.API_URL+"/transactions", {params: params})
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

  getCountTransactionByMoyen(){
    let params = new HttpParams()
      .append('paymentMethods','ORANGE_MONEY,WAVE,FREE_MONEY,CASH')
    return this.http.get(this.API_URL+"/transactions/countByPaymentMethods", {params: params})
  }

  getCountTransactionCash(){
    let params = new HttpParams()
      .append('paymentMethods','CASH')
    return this.http.get<ApiResponseInterface>(this.API_URL+"/transactions/countByPaymentMethods", {params: params})
  }
}
