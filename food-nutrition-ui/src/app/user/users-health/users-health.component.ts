import { Component } from '@angular/core';
import { UsersFoodIntakeListComponent } from '../users-food-intake-list/users-food-intake-list.component';
import { UsersFoodChartComponent } from '../users-food-chart/users-food-chart.component';

@Component({
    selector: 'app-users-health',
    imports: [UsersFoodIntakeListComponent, UsersFoodChartComponent],
    templateUrl: './users-health.component.html',
    styleUrl: './users-health.component.css',
})
export class UsersHealthComponent { }
