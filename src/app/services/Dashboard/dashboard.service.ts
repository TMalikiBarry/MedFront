import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DashboardDataInterface} from "../../models/dashboard-data.interface";
import {environment} from "src/environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly url = environment.apiURL + "/dashboard-data"

  constructor(private http: HttpClient) {
  }

  getDashboardData(): Observable<DashboardDataInterface> {
    return this.http.get<DashboardDataInterface>(this.url);
  }
}
