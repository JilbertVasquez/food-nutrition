import { Component, OnInit, Signal } from '@angular/core';
import { ImaggaTagsService } from '../_services/imagga-tags.service';
import { ImaggaTag } from '../dtos/imagga-response';
import { SearchInstantService } from '../_services/search-instant.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { coerceStringArray } from '@angular/cdk/coercion';
import { FoodNutritionDetails } from '../dtos/food-description-dto';
import { NaturalNutrientsService } from '../_services/natural-nutrients.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-food-nutrition-list',
  imports: [MatButtonModule],
  templateUrl: './food-nutrition-list.component.html',
  styleUrl: './food-nutrition-list.component.css'
})
export class FoodNutritionListComponent {
    imageTags: Signal<ImaggaTag[] | null>;
    foodItem: FoodNutritionDetails[] | null = null;

    constructor(private _imaggaTagsService: ImaggaTagsService,
        private _naturalNutrientsService : NaturalNutrientsService
    ) {
        this.imageTags = this._imaggaTagsService.imageTags.asReadonly();
        // console.log(this.imageTags());




        // toObservable(this.imageTags)
        // .pipe(takeUntilDestroyed())
        // .subscribe(async (hasValue) => {
        //     if (hasValue) {
        //         // console.log(this.imageTags());
        //         // for (const tag of this.imageTags()!) {
        //         //     try {
        //         //         const response = await this._naturalNutrientsService.searchNaturalNutrients(tag.tag.en);

        //         //         // Check if response contains the expected data before accessing it
        //         //         response.foods.forEach((food: FoodNutritionDetails) => {
        //         //             console.log(food);
        //         //         });
        //         //         this.foodItem = response.foods;
        //         //     } catch (error: any) {
        //         //         if (error.status === 404) {
        //         //             console.log("API returned 404, skipping this tag:", tag.tag.en);
        //         //             continue; // Skip this iteration and continue the loop
        //         //         } else {
        //         //             console.error("An unexpected error occurred:", error);
        //         //         }
        //         //     }
        //         // }

        //     }
        //     else {
        //         console.log("no value");
        //     }
        // })
    }

    async clickme() {
        const mockImageTags = [
            { confidence: 100, tag: { en: 'bread' } },
            { confidence: 35.0150985717773, tag: { en: 'wheat' } },
            { confidence: 28.2228393554688, tag: { en: 'bun' } }
        ];

        let foodList: FoodNutritionDetails[] = [];

        for (const tag of mockImageTags) {
            try {
                console.log(tag);
                const response = await this._naturalNutrientsService.searchNaturalNutrients(tag.tag.en);

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
                    console.log("API returned 404, skipping this tag:", tag.tag.en);
                    continue; // Skip this iteration and continue the loop
                } else {
                    console.error("An unexpected error occurred:", error);
                }
            }
        }
        this.foodItem = foodList;
        console.log(this.foodItem);
    }
}
