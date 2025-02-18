import { Component, computed, Signal } from '@angular/core';
import { DonutChartComponent } from '../../donut-chart/donut-chart.component';
import { FoodNutritionDetails } from '../../dtos/food-description-dto';
import { UserService } from '../../_services/user.service';
import { USER_NUTRITION_CONSTANTS } from '../../_utils/constants';

@Component({
    selector: 'app-users-food-chart',
    imports: [DonutChartComponent],
    templateUrl: './users-food-chart.component.html',
    styleUrl: './users-food-chart.component.css',
})
export class UsersFoodChartComponent {
    userNutritionConstants = USER_NUTRITION_CONSTANTS;
    userFoodIntake: Signal<FoodNutritionDetails[]>;

    userSugar = computed(() => {
        const foodList = this.userFoodIntake();

        if (!foodList || foodList.length === 0) return 0;

        return foodList.reduce((total, food) => total + food.nf_sugars, 0);
    });

    constructor(private _userService: UserService) {
        this.userFoodIntake = this._userService.userFoodIntake.asReadonly();
    }
}
