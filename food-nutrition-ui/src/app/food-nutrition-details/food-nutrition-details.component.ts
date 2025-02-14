import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FoodNutritionDetails } from '../dtos/food-description-dto';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-food-nutrition-details',
    imports: [MatCardModule, MatButtonModule, MatDividerModule, MatIconModule],
    templateUrl: './food-nutrition-details.component.html',
    styleUrl: './food-nutrition-details.component.css'
})
export class FoodNutritionDetailsComponent implements OnInit {
    // selectedFood: FoodNutritionDetails | null = null;

    selectedFood: FoodNutritionDetails = {
        food_name: "bread",
        serving_unit: "slice",
        serving_qty: 1,
        serving_weight_grams: 29,
        nf_calories: 77.14,
        nf_total_fat: 0.97,
        nf_cholesterol: 0,
        nf_sodium: 142.1,
        nf_total_carbohydrate: 14.33,
        nf_dietary_fiber: 0.78,
        nf_sugars: 1.64,
        nf_protein: 2.57,
        nf_potassium: 36.54
    };

    constructor() { }

    ngOnInit() {

    }
}
