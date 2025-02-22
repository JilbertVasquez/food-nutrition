import { Component, computed, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
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
        const percentage = (this.actualValueSignal() / this.recommendedValueSignal()) * 100;

        if (percentage < 25) return 'cool';      // Below 25%
        if (percentage < 50) return 'vivid';     // 25% - 49%
        if (percentage < 75) return 'fire';      // 50% - 74%
        return 'flame';                          // 75% and above
    });


    // Recommended daily sugar intake (e.g., 50g)
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

    // User's actual sugar intake (e.g., 94g)
    // Chart Data
    chartData: {name: string, value: number}[] = [];
    calorieSourceData: { name: string; value: number }[] = [];

    ngOnChanges(changes: SimpleChanges) {
        this.actualValueSignal.set(this.actualValue);
        this.recommendedValueSignal.set(this.recommendedValue);

        this.calculateChartData();
        this.calculateCalorieSource();

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

    // calculateCalorieSource() {
    //     // Macronutrient calorie values
    // const carbCalories = this.carbohydrate * 4;
    // const proteinCalories = this.protein * 4;
    // const fatCalories = this.fat * 9;

    // // Total calculated calories
    // const totalCalculatedCalories = carbCalories + proteinCalories + fatCalories;

    // // Scaling factor to adjust the sum to match the given calories
    // const scalingFactor = this.calories / totalCalculatedCalories;

    // // Adjusted calorie values
    // const adjustedCarbCalories = carbCalories * scalingFactor;
    // const adjustedProteinCalories = proteinCalories * scalingFactor;
    // const adjustedFatCalories = fatCalories * scalingFactor;

    // // Calculate percentages
    // const carbPercentage = Math.round((adjustedCarbCalories / this.calories) * 100);
    // const proteinPercentage = Math.round((adjustedProteinCalories / this.calories) * 100);
    // const fatPercentage = Math.round((adjustedFatCalories / this.calories) * 100);

    //     this.calorieSourceData = [
    //         { name: 'Carbohydrates', value: carbPercentage },
    //         { name: 'Protein', value: proteinPercentage },
    //         { name: 'Fat', value: fatPercentage },
    //     ];
    // }

    calculateCalorieSource() {
        // Macronutrient calorie values
        const carbCalories = this.carbohydrate * 4;
        const proteinCalories = this.protein * 4;
        const fatCalories = this.fat * 9;

        // Total calculated calories
        const totalCalculatedCalories = carbCalories + proteinCalories + fatCalories;

        // Scaling factor to match given calories
        const scalingFactor = this.calories / totalCalculatedCalories;

        // Adjusted values
        let adjustedCarbCalories = carbCalories * scalingFactor;
        let adjustedProteinCalories = proteinCalories * scalingFactor;
        let adjustedFatCalories = fatCalories * scalingFactor;

        // Convert to percentages
        let carbPercentage = (adjustedCarbCalories / this.calories) * 100;
        let proteinPercentage = (adjustedProteinCalories / this.calories) * 100;
        let fatPercentage = (adjustedFatCalories / this.calories) * 100;

        // Round values
        // carbPercentage = Math.round(carbPercentage);
        proteinPercentage = Math.round(proteinPercentage);
        // fatPercentage = 100 - (carbPercentage + proteinPercentage); // Ensure total is 100%
        fatPercentage = Math.round(fatPercentage);
        carbPercentage = 100 - (fatPercentage + proteinPercentage); // Ensure total is 100%

        this.calorieSourceData = [
            { name: 'Carbohydrates', value: carbPercentage },
            { name: 'Protein', value: proteinPercentage },
            { name: 'Fat', value: fatPercentage },
        ];
    }

}
