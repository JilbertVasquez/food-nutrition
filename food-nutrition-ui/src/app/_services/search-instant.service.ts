import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SearchInstantService {
    private _baseUrl = environment.baseUrl + 'search/instant';
    private _appId = environment.nutritionixAppId;
    private _appKey = environment.nutritionixAppKey;

    constructor(private http: HttpClient) {}

    searchInstant(query: string = "potato") {
        const headers = new HttpHeaders({
            'x-app-id': this._appId,
            'x-app-key': this._appKey,
            'Content-Type': 'application/json',
        });

        const url = `${this._baseUrl}?query=${query}`;
        return lastValueFrom(this.http.get<any>(url, { headers }));
    }
}
