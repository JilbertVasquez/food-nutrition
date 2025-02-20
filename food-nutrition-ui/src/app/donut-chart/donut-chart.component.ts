import { Component, computed, Input, OnChanges, SimpleChanges } from '@angular/core';
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

    schemeColor = computed(() => {
        const percentage = (this.actualValue / this.recommendedValue) * 100;

        if (percentage < 25) return 'cool';      // Below 25%
        if (percentage < 50) return 'vivid';     // 25% - 49%
        if (percentage < 75) return 'fire';      // 50% - 74%
        return 'flame';                          // 75% and above
    });


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

        // this.isExceed = this.actualValue >= this.recommendedValue;
        this.isExceed = (this.actualValue / this.recommendedValue) * 100 >= 75;
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
