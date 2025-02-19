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

    userCalories = computed(() => {
        const foodList = this.userFoodIntake();

        if (!foodList || foodList.length === 0) return 0;

        const total = foodList.reduce((total, food) => total + food.nf_calories, 0);
        return Math.round(total * 100) / 100;
    });

    userFat = computed(() => {
        const foodList = this.userFoodIntake();

        if (!foodList || foodList.length === 0) return 0;

        const total = foodList.reduce((total, food) => total + food.nf_total_fat, 0);
        return Math.round(total * 100) / 100;
    });

    userCholesterol = computed(() => {
        const foodList = this.userFoodIntake();

        if (!foodList || foodList.length === 0) return 0;

        const total = foodList.reduce((total, food) => total + food.nf_cholesterol, 0);
        return Math.round(total * 100) / 100;
    });

    userSoduim = computed(() => {
        const foodList = this.userFoodIntake();

        if (!foodList || foodList.length === 0) return 0;

        const total = foodList.reduce((total, food) => total + food.nf_sodium, 0);
        return Math.round(total * 100) / 100;
    });

    userCarbohydrates = computed(() => {
        const foodList = this.userFoodIntake();

        if (!foodList || foodList.length === 0) return 0;

        const total = foodList.reduce((total, food) => total + food.nf_total_carbohydrate, 0);
        return Math.round(total * 100) / 100;
    });

    userDietaryFiber = computed(() => {
        const foodList = this.userFoodIntake();

        if (!foodList || foodList.length === 0) return 0;

        const total = foodList.reduce((total, food) => total + food.nf_dietary_fiber, 0);
        return Math.round(total * 100) / 100;
        return Math.round(total * 100) / 100;
    });

    userSugar = computed(() => {
        const foodList = this.userFoodIntake();

        if (!foodList || foodList.length === 0) return 0;

        const total = foodList.reduce((total, food) => total + food.nf_sugars, 0);
        return Math.round(total * 100) / 100;
    });

    userProtein = computed(() => {
        const foodList = this.userFoodIntake();

        if (!foodList || foodList.length === 0) return 0;

        const total = foodList.reduce((total, food) => total + food.nf_protein, 0);
        return Math.round(total * 100) / 100;
    });

    constructor(private _userService: UserService) {
        this.userFoodIntake = this._userService.userFoodIntake.asReadonly();
    }
}
