import { Component, Signal } from '@angular/core';
import { FoodNutritionDetails } from '../../dtos/food-description-dto';
import { UserService } from '../../_services/user.service';
import { MatCardModule } from '@angular/material/card';
import { DialogService } from '../../_services/dialog.service';
import { lastValueFrom } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-users-food-intake-list',
    imports: [MatCardModule, MatIconModule, MatButtonModule],
    templateUrl: './users-food-intake-list.component.html',
    styleUrl: './users-food-intake-list.component.css',
})
export class UsersFoodIntakeListComponent {
    userFoodIntake: Signal<FoodNutritionDetails[]>;

    constructor(private _userService: UserService, private _dialogService: DialogService) {
        this.userFoodIntake = this._userService.userFoodIntake.asReadonly();
    }

    async openFoodDetails(foodData: FoodNutritionDetails) {
        const newData = await lastValueFrom(this._dialogService.foodNutritionDetailsModal(foodData).afterClosed());

        if (newData) {
            this._userService.updateUserFoodIntake(newData);
        }
    }

    async onDeleteFoodItem(deleteFood: FoodNutritionDetails) {
        const isConfirm = await lastValueFrom(this._dialogService.confirmationModal(`Do you want to delete ${deleteFood.food_name} food?`).afterClosed());

        if (!isConfirm) return;

        this._userService.deleteUserFoodIntake(deleteFood);

        this._dialogService.message(`The ${deleteFood.food_name} food is successfully deleted.`);
    }

}
