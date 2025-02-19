import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
    selector: 'app-donut-chart',
    standalone: true,
    imports: [NgxChartsModule],
    templateUrl: './donut-chart.component.html',
})
export class DonutChartComponent implements OnChanges {
    @Input({ required: true }) title: string = "";
    isExceed = false;



    // Recommended daily sugar intake (e.g., 50g)
    @Input({ required: true }) recommendedValue: number = 0;
    @Input({ required: true }) actualValue: number = 0;
    @Input({ required: true }) unit: string = "";

    @Input() height: number = 180;
    @Input() width: number = 180;

    // User's actual sugar intake (e.g., 94g)
    // Chart Data
    chartData: {name: string, value: number}[] = [];

    ngOnChanges(changes: SimpleChanges) {
        this.calculateChartData();

        this.isExceed = this.actualValue > this.recommendedValue;
    }

    calculateChartData() {
        this.chartData = [
            { name: `Actual ${this.title} Intake`, value: this.actualValue },
            {
                name: 'Remaining Allowance',
                value: Math.max(0, this.recommendedValue - this.actualValue),
            },
        ];
    }
}
