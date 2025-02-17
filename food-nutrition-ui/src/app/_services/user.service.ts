import { Injectable, signal } from '@angular/core';
import { FoodNutritionDetails } from '../dtos/food-description-dto';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    userFoodIntake = signal<FoodNutritionDetails[]>([]);
    constructor() {}
}
