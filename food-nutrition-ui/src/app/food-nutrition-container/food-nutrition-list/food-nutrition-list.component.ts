import { Component, Signal } from '@angular/core';
import { ImaggaTagsService } from '../../_services/imagga-tags.service';
import { ImaggaTag } from '../../dtos/imagga-response';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FoodNutritionDetails } from '../../dtos/food-description-dto';
import { NaturalNutrientsService } from '../../_services/natural-nutrients.service';
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

        toObservable(this.imageTags)
            .pipe(takeUntilDestroyed())
            .subscribe(async (hasValue) => {
                if (hasValue && !this.foodItem()) {
                    let foodList: FoodNutritionDetails[] = [];

                    for (const tag of this.imageTags()!) {
                        try {
                            const response =  await this._naturalNutrientsService.searchNaturalNutrients(tag.tag.en);
                            const food: FoodNutritionDetails = response.foods[0];

                            foodList.push(food);
                        } catch (error: any) {
                            if (error.status === 404) {
                                // console.log( 'API returned 404, skipping this tag:', tag.tag.en);

                                continue;
                            }
                            else {
                                // console.error('An unexpected error occurred:', error);
                            }
                        }
                    }
                    this._naturalNutrientsService.foodItem.set(foodList);
                    this._imaggaTagsService.isAnalyzing.set(false);

                } else {
                    this._naturalNutrientsService.selectedFood.set(null);
                }
            });
    }

    onSelect(food: FoodNutritionDetails) {
        this.selectedFood = food;
        this._naturalNutrientsService.selectedFood.set(food);
    }

    isSelected(food: FoodNutritionDetails) {
        return this.selectedFood === food;
    }
}
