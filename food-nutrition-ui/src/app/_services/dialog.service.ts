import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FoodDetailsModalComponent } from '../_shared/food-details-modal/food-details-modal.component';
import { FoodNutritionDetails } from '../dtos/food-description-dto';

@Injectable({
    providedIn: 'root',
})
export class DialogService {
    private defailt_duration = 3000;

    constructor(private _snackBar: MatSnackBar, private _modal: MatDialog) {}

    message(message: string) {
        this._snackBar.open(message, 'dismiss', {
            duration: this.defailt_duration,
        });
    }

    error(message: string) {
        this._snackBar.open(message, 'dismiss', {
            duration: this.defailt_duration,
        });
    }

    foodNutritionDetailsModal(foodData: FoodNutritionDetails): MatDialogRef<FoodDetailsModalComponent> {
        return this._modal.open(FoodDetailsModalComponent, {data: { foodData: foodData }});
    }
}
