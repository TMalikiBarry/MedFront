import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ApiResponseInterface} from "../../models/api-response.interface";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  readonly API_URL = environment.apiURL

  readonly ENDPOINT_TRANSACTION = "/transactions/"

  constructor(private http : HttpClient) { }

  saveTransaction(data: any, moyen: string) {
    let params = new HttpParams();
    params = params.append('moyen', moyen.toString());
    return this.http.post<ApiResponseInterface>(this.API_URL+"/transactions", data , {params : params})
  }
}
