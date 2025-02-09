import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NaturalNutrientsService {
    private _nutritionixBaseUrl = environment.nutritionixBaseUrl + 'natural/nutrients';
    private _appId = environment.nutritionixAppId;
    private _appKey = environment.nutritionixAppKey;

    constructor(private http: HttpClient) {}

    searchNaturalNutrients(query: string = 'bread') {
        const headers = new HttpHeaders({
            'x-app-id': this._appId,
            'x-app-key': this._appKey,
            'Content-Type': 'application/json',
        });

        const body = { query };

        const url = `${this._nutritionixBaseUrl}`;
        return lastValueFrom(this.http.post<any>(url, body, { headers }));
    }
}
