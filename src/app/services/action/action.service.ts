import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {UtilsService} from "../utils/utils.service";
import {environment} from "../../../environments/environment.prod";
import {ActionInterface} from "../../models/action.interface";
import {Observable} from "rxjs";
import {Page} from "../../models/pagination.interface";
import {ApiResponseInterface} from "../../models/api-response.interface";

@Injectable({
    providedIn: 'root'
})
export class ActionService {

    private readonly url = `${environment.apiURL}/action`;
    private readonly urlFoncte = `${environment.apiURL}/fonctionnalite/all`;

    constructor(private http: HttpClient, private utils: UtilsService) {
    }

    save(action: ActionInterface): Observable<ActionInterface> {

        return this.http.post<ActionInterface>(this.url, action);
    }

    update(action: ActionInterface): Observable<ActionInterface> {
        return this.http.patch<ActionInterface>(this.url, action);
    }

    delete(actionCode: string): Observable<Boolean> {
        return this.http.delete<boolean>(`${this.url}/delete/${actionCode}`);
    }

    getAll(): Observable<ActionInterface[]> {
        return this.http.get<ActionInterface[]>(this.url + '/allPresent');
    }

    getAllPaginated(page: number = 0, size: number = 10): Observable<Page<ActionInterface>> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString());

        return this.http.get<Page<ActionInterface>>(this.url, {params});
    }

    getAllFoncte(): Observable<ApiResponseInterface> {
        return this.http.get<ApiResponseInterface>(this.urlFoncte);
    }
}
