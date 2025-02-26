import { Component } from '@angular/core';
import { ImaggaTaggerComponent } from '../imagga-tagger/imagga-tagger.component';
import { FoodNutritionListComponent } from './food-nutrition-list/food-nutrition-list.component';
import { FoodNutritionDetailsComponent } from './food-nutrition-details/food-nutrition-details.component';

@Component({
    selector: 'app-food-nutrition-container',
    standalone: true,
    imports: [ImaggaTaggerComponent, FoodNutritionListComponent, FoodNutritionDetailsComponent],
    templateUrl: './food-nutrition-container.component.html',
    styleUrl: './food-nutrition-container.component.css',
})
export class FoodNutritionContainerComponent {}
