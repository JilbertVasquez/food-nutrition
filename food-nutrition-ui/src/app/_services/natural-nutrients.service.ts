import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { FoodNutritionDetails } from '../dtos/food-description-dto';

@Injectable({
    providedIn: 'root',
})
export class NaturalNutrientsService {
    private _nutritionixBaseUrl = environment.nutritionixBaseUrl + '/natural/nutrients';
    private _appId = environment.nutritionixAppId;
    private _appKey = environment.nutritionixAppKey;

    selectedFood = signal<FoodNutritionDetails | null>(null);
    foodItem = signal<FoodNutritionDetails[] | null>(null);

    constructor(private http: HttpClient) {}

    searchNaturalNutrients(query: string = 'bread') {
        const headers = new HttpHeaders({
            'x-app-id': this._appId,
            'x-app-key': this._appKey,
            'Content-Type': 'application/json',
        });

        const body = { query };

        return lastValueFrom(this.http.post<any>(this._nutritionixBaseUrl, body, { headers }));
    }
}
