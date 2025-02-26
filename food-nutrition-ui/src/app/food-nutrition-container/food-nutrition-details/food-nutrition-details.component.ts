import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FoodNutritionDetails } from '../../dtos/food-description-dto';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NaturalNutrientsService } from '../../_services/natural-nutrients.service';
import { UserService } from '../../_services/user.service';
import { DonutChartComponent } from '../../_shared/donut-chart/donut-chart.component';
import { DialogService } from '../../_services/dialog.service';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-food-nutrition-details',
    imports: [MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, DonutChartComponent],
    templateUrl: './food-nutrition-details.component.html',
    styleUrl: './food-nutrition-details.component.css'
})
export class FoodNutritionDetailsComponent {
    quantity = signal<number>(1);

    selectedFood = computed(() => {
        const selectedFood = this._naturalNutrientsService.selectedFood();

        if (!selectedFood) return null;

        return this._computeData(selectedFood, this.quantity());
    })

    constructor(
        private _naturalNutrientsService: NaturalNutrientsService,
        private _userService: UserService,
        private _dialogService: DialogService
    ) { }

    increaseQuantity() {
        this.quantity.update(q => q + 1);
    }

    decreaseQuantity() {
        this.quantity.update(q => (q > 1 ? q - 1 : q));
    }

    async addFood() {
        const selectedFood = this.selectedFood();
        if (!selectedFood) return;

        const modalRef = this._dialogService.confirmationModal(`Do you want to add this ${selectedFood.food_name} food to your food intake?`).afterClosed();
        const isConfirm = await lastValueFrom(modalRef);

        if (!isConfirm) return;

        this._dialogService.message(`${selectedFood.food_name} food is successfully added to your food intake.`);

        const userFoodIntake = this._userService.userFoodIntake();

        const existingFood = userFoodIntake.find(food => food.food_name === selectedFood.food_name);

        if (existingFood) {
            existingFood.serving_qty += selectedFood.serving_qty;
            existingFood.serving_weight_grams += selectedFood.serving_weight_grams;

            existingFood.nf_calories += selectedFood.nf_calories;
            existingFood.nf_total_fat += selectedFood.nf_total_fat;
            existingFood.nf_cholesterol += selectedFood.nf_cholesterol;
            existingFood.nf_sodium += selectedFood.nf_sodium;
            existingFood.nf_total_carbohydrate += selectedFood.nf_total_carbohydrate;
            existingFood.nf_dietary_fiber += selectedFood.nf_dietary_fiber;
            existingFood.nf_sugars += selectedFood.nf_sugars;
            existingFood.nf_protein += selectedFood.nf_protein;
            existingFood.nf_potassium += selectedFood.nf_potassium;
        }
        else {
            userFoodIntake.push({ ...selectedFood });
        }
    }

    private _computeData(selectedFood: FoodNutritionDetails, quantity: number): FoodNutritionDetails {
        return {
            food_name: selectedFood.food_name,
            
            serving_unit: selectedFood.serving_unit,
            serving_qty: selectedFood.serving_qty * quantity,
            serving_weight_grams: this._roundToTwo(selectedFood.serving_weight_grams * quantity),

            nf_calories: this._roundToTwo(selectedFood.nf_calories * quantity),
            nf_total_fat: this._roundToTwo(selectedFood.nf_total_fat * quantity),
            nf_cholesterol: this._roundToTwo(selectedFood.nf_cholesterol * quantity),
            nf_sodium: this._roundToTwo(selectedFood.nf_sodium * quantity),
            nf_total_carbohydrate: this._roundToTwo(selectedFood.nf_total_carbohydrate * quantity),
            nf_dietary_fiber: this._roundToTwo(selectedFood.nf_dietary_fiber * quantity),
            nf_sugars: this._roundToTwo(selectedFood.nf_sugars * quantity),
            nf_protein: this._roundToTwo(selectedFood.nf_protein * quantity),
            nf_potassium: this._roundToTwo(selectedFood.nf_potassium * quantity),
        };
    }

    private _roundToTwo(value: number): number {
        return Math.round(value * 100) / 100;
    }
}
