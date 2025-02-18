import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
    selector: 'app-donut-chart',
    standalone: true,
    imports: [NgxChartsModule],
    templateUrl: './donut-chart.component.html',
})
export class DonutChartComponent {
    title = "FoodName";

    // Recommended daily sugar intake (e.g., 50g)
    recommendedSugar = 50;

    // User's actual sugar intake (e.g., 94g)
    actualSugar = 44;

    // Chart Data
    chartData = this.calculateChartData();

    calculateChartData() {
        return [
            { name: `Actual ${this.title} Intake`, value: this.actualSugar },
            {
                name: 'Remaining Allowance',
                value: Math.max(0, this.recommendedSugar - this.actualSugar),
            },
        ];
    }
}
