import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FoodNutritionContainerComponent } from './food-nutrition-container/food-nutrition-container.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'food-analyzer',
        component: FoodNutritionContainerComponent
    },
    // {
    //     path: 'users-health',

    // }
];
