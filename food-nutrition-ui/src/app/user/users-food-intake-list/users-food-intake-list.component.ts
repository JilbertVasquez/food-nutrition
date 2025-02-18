import { Component, computed, Signal } from '@angular/core';
import { FoodNutritionDetails } from '../../dtos/food-description-dto';
import { UserService } from '../../_services/user.service';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-users-food-intake-list',
    imports: [MatCardModule],
    templateUrl: './users-food-intake-list.component.html',
    styleUrl: './users-food-intake-list.component.css',
})
export class UsersFoodIntakeListComponent {
    userFoodIntake: Signal<FoodNutritionDetails[]>;

    userFoodList = computed(() => {
        const foodList = this.userFoodIntake();

        if (!foodList) return [];

        return foodList.map((food) => ({
            food_name: food.food_name,
            serving_qty: food.serving_qty,
            serving_unit: food.serving_unit
        }));
    })

    constructor(private _userService: UserService) {
        this.userFoodIntake = this._userService.userFoodIntake.asReadonly();
    }
}
