import { Component } from '@angular/core';
import { FoodNutritionContainerComponent } from './food-nutrition-container/food-nutrition-container.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FoodNutritionContainerComponent, HeaderComponent, RouterModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    title = 'food-nutrition';


}
