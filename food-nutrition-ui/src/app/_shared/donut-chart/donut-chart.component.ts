import { Component, computed, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
    selector: 'app-donut-chart',
    standalone: true,
    imports: [NgxChartsModule],
    templateUrl: './donut-chart.component.html',
})
export class DonutChartComponent implements OnChanges {
    schemeColor = computed(() => {
        const percentage = (this.actualValueSignal() / this.recommendedValueSignal()) * 100;

        if (percentage < 25) return 'cool';      // Below 25%
        if (percentage < 50) return 'vivid';     // 25% - 49%
        if (percentage < 75) return 'fire';      // 50% - 74%
        return 'flame';                          // 75% and above
    });

    @Input({ required: true }) title: string = "";
    isExceed = false;

    @Input() recommendedValue: number = 0;
    @Input() actualValue: number = 0;
    @Input() unit: string = "";

    @Input() height: number = 180;
    @Input() width: number = 180;

    @Input() isFoodDetails: boolean = false;

    @Input() calories: number = 77.14;
    @Input() protein: number = 0;
    @Input() carbohydrate: number = 0;
    @Input() fat: number = 0;

    actualValueSignal = signal(0);
    recommendedValueSignal = signal(0);

    chartData: {name: string, value: number}[] = [];
    calorieSourceData: { name: string; value: number }[] = [];

    ngOnChanges(changes: SimpleChanges) {
        this.actualValueSignal.set(this.actualValue);
        this.recommendedValueSignal.set(this.recommendedValue);

        this.calculateChartData();
        this.calculateCalorieSource();

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

    calculateCalorieSource() {
        const carbohydrateCalories = this.carbohydrate * 4;
        const proteinCalories = this.protein * 4;
        const fatCalories = this.fat * 9;

        const totalCalculatedCalories = carbohydrateCalories + proteinCalories + fatCalories;

        const scalingFactor = this.calories / totalCalculatedCalories;

        let adjustedCarbohydrateCalories = carbohydrateCalories * scalingFactor;
        let adjustedProteinCalories = proteinCalories * scalingFactor;
        let adjustedFatCalories = fatCalories * scalingFactor;

        let carbohydratePercentage = (adjustedCarbohydrateCalories / this.calories) * 100;
        let proteinPercentage = (adjustedProteinCalories / this.calories) * 100;
        let fatPercentage = (adjustedFatCalories / this.calories) * 100;

        proteinPercentage = Math.round(proteinPercentage);
        fatPercentage = Math.round(fatPercentage);
        carbohydratePercentage = 100 - (fatPercentage + proteinPercentage);

        this.calorieSourceData = [
            { name: 'Carbohydrates', value: carbohydratePercentage },
            { name: 'Protein', value: proteinPercentage },
            { name: 'Fat', value: fatPercentage },
        ];
    }
}
