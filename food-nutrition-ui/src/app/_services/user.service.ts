import { Injectable, signal } from '@angular/core';
import { FoodNutritionDetails } from '../dtos/food-description-dto';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    userFoodIntake = signal<FoodNutritionDetails[]>([]);
    constructor() {}

    updateUserFoodIntake(updatedFood: FoodNutritionDetails) {
        this.userFoodIntake.update(foodList => {
            return foodList.map(food =>
                food.food_name === updatedFood.food_name ? updatedFood : food
            );
        });
    }

    deleteUserFoodIntake(deleteFood: FoodNutritionDetails) {
        this.userFoodIntake.update(foodList => {
            return foodList.filter(food =>
                food.food_name !== deleteFood.food_name
            );
        });
    }
}
