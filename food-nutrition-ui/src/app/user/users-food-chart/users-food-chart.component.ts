import { Component } from '@angular/core';
import { DonutChartComponent } from '../../donut-chart/donut-chart.component';

@Component({
    selector: 'app-users-food-chart',
    imports: [DonutChartComponent],
    templateUrl: './users-food-chart.component.html',
    styleUrl: './users-food-chart.component.css',
})
export class UsersFoodChartComponent {}
