import { Component, OnInit, Signal } from '@angular/core';
import { ImaggaTagsService } from '../_services/imagga-tags.service';
import { ImaggaTag } from '../dtos/imagga-response';
import { SearchInstantService } from '../_services/search-instant.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { coerceStringArray } from '@angular/cdk/coercion';
import { FoodNutritionDetails } from '../dtos/food-description-dto';
import { NaturalNutrientsService } from '../_services/natural-nutrients.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-food-nutrition-list',
    imports: [MatButtonModule, MatCardModule],
    templateUrl: './food-nutrition-list.component.html',
    styleUrl: './food-nutrition-list.component.css',
})
export class FoodNutritionListComponent {
    imageTags: Signal<ImaggaTag[] | null>;
    foodItem: Signal<FoodNutritionDetails[] | null>;
    selectedFood: FoodNutritionDetails | null = null;

    constructor(
        private _imaggaTagsService: ImaggaTagsService,
        private _naturalNutrientsService: NaturalNutrientsService
    ) {
        this.imageTags = this._imaggaTagsService.imageTags.asReadonly();
        this.foodItem = this._naturalNutrientsService.foodItem.asReadonly();
        // console.log(this.imageTags());
        console.log(this.imageTags());
        console.log(this.foodItem());
        toObservable(this.imageTags)
            .pipe(takeUntilDestroyed())
            .subscribe(async (hasValue) => {
                if (hasValue && !this.foodItem()) {
                    let foodList: FoodNutritionDetails[] = [];

                    // console.log(this.imageTags());
                    for (const tag of this.imageTags()!) {
                        try {
                            // console.log(tag);
                            const response =
                                await this._naturalNutrientsService.searchNaturalNutrients(
                                    tag.tag.en
                                );

                            // Check if response contains the expected data before accessing it
                            // response.foods.forEach((food: FoodNutritionDetails) => {
                            //     console.log(food);
                            // });
                            // this.foodItem = response.foods;
                            const food: FoodNutritionDetails =
                                response.foods[0];
                            // console.log(food);
                            foodList.push(food);
                        } catch (error: any) {
                            if (error.status === 404) {
                                console.log(
                                    'API returned 404, skipping this tag:',
                                    tag.tag.en
                                );
                                continue; // Skip this iteration and continue the loop
                            } else {
                                console.error(
                                    'An unexpected error occurred:',
                                    error
                                );
                            }
                        }
                    }
                    // this.foodItem = foodList;
                    this._naturalNutrientsService.foodItem.set(foodList);
                    this._imaggaTagsService.isAnalyzing.set(false);
                    // console.log(this.foodItem);
                } else {
                    // console.log("no value");
                    // this.foodItem = null;
                    this._naturalNutrientsService.selectedFood.set(null);
                }
            });
    }

    async clickme() {
        const mockImageTags = [
            { confidence: 100, tag: { en: 'bread' } },
            // { confidence: 35.0150985717773, tag: { en: 'wheat' } },
            // { confidence: 28.2228393554688, tag: { en: 'bun' } }
        ];

        let foodList: FoodNutritionDetails[] = [];

        for (const tag of mockImageTags) {
            try {
                console.log(tag);
                const response =
                    await this._naturalNutrientsService.searchNaturalNutrients(
                        tag.tag.en
                    );

                // Check if response contains the expected data before accessing it
                // response.foods.forEach((food: FoodNutritionDetails) => {
                //     console.log(food);
                // });
                // this.foodItem = response.foods;
                const food: FoodNutritionDetails = response.foods[0];
                // console.log(food);
                foodList.push(food);
            } catch (error: any) {
                if (error.status === 404) {
                    console.log(
                        'API returned 404, skipping this tag:',
                        tag.tag.en
                    );
                    continue; // Skip this iteration and continue the loop
                } else {
                    console.error('An unexpected error occurred:', error);
                }
            }
        }
        this._naturalNutrientsService.foodItem.set(foodList);
        // console.log(this.foodItem);
    }

    onSelect(food: FoodNutritionDetails) {
        this.selectedFood = food;
        this._naturalNutrientsService.selectedFood.set(food);
        // console.log("HELLO WORLD")
    }

    isSelected(food: FoodNutritionDetails) {
        return this.selectedFood === food;
    }
}
