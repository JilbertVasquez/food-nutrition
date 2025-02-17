import { Component, Signal } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { FoodNutritionDetails } from '../../dtos/food-description-dto';
import { NaturalNutrientsService } from '../../_services/natural-nutrients.service';

@Component({
    selector: 'app-users-health',
    imports: [],
    templateUrl: './users-health.component.html',
    styleUrl: './users-health.component.css',
})
export class UsersHealthComponent {
    userFoodIntake: Signal<FoodNutritionDetails[]>;
    constructor(private _userService: UserService) {
        this.userFoodIntake = this._userService.userFoodIntake.asReadonly();
    }
}
