import { Component, computed, Inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { DonutChartComponent } from '../donut-chart/donut-chart.component';
import { FoodNutritionDetails } from '../../dtos/food-description-dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-food-details-modal',
    imports: [MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, DonutChartComponent],
    templateUrl: './food-details-modal.component.html',
    styleUrl: './food-details-modal.component.css',
})
export class FoodDetailsModalComponent {
    quantity = signal<number>(1);

    selectedFood = computed(() => {
        const selectedFood = this.data.foodData;

        if (!selectedFood) return null;

        if (this.quantity() == this.data.foodData.serving_qty) return selectedFood;

        return this._computeData(selectedFood, this.quantity());
    })

    constructor(private _dialogRef: MatDialogRef<FoodDetailsModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { foodData: FoodNutritionDetails }
    ) {
        this.quantity.set(this.data.foodData.serving_qty);

        this._dialogRef.backdropClick().subscribe(() => {
            this._dialogRef.close(this.selectedFood());
        });
    }

    increaseQuantity() {
        this.quantity.update(q => q + 1);
    }

    decreaseQuantity() {
        this.quantity.update(q => (q > 1 ? q - 1 : q));
    }

    private _computeData(selectedFood: FoodNutritionDetails, quantity: number): FoodNutritionDetails {
        return {
            food_name: selectedFood.food_name,

            serving_unit: selectedFood.serving_unit,
            serving_qty: quantity,
            serving_weight_grams: this._roundToTwo(selectedFood.serving_weight_grams / selectedFood.serving_qty * quantity),
            
            nf_calories: this._roundToTwo(selectedFood.nf_calories / selectedFood.serving_qty * quantity),
            nf_total_fat: this._roundToTwo(selectedFood.nf_total_fat / selectedFood.serving_qty * quantity),
            nf_cholesterol: this._roundToTwo(selectedFood.nf_cholesterol / selectedFood.serving_qty * quantity),
            nf_sodium: this._roundToTwo(selectedFood.nf_sodium / selectedFood.serving_qty * quantity),
            nf_total_carbohydrate: this._roundToTwo(selectedFood.nf_total_carbohydrate / selectedFood.serving_qty * quantity),
            nf_dietary_fiber: this._roundToTwo(selectedFood.nf_dietary_fiber / selectedFood.serving_qty * quantity),
            nf_sugars: this._roundToTwo(selectedFood.nf_sugars / selectedFood.serving_qty * quantity),
            nf_protein: this._roundToTwo(selectedFood.nf_protein / selectedFood.serving_qty * quantity),
            nf_potassium: this._roundToTwo(selectedFood.nf_potassium / selectedFood.serving_qty * quantity),
        };
    }

    private _roundToTwo(value: number): number {
        return Math.round(value * 100) / 100;
    }
}
