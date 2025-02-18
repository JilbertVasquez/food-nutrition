import { Component, OnInit } from '@angular/core';
import { SearchInstantService } from '../_services/search-instant.service';
import { NaturalNutrientsService } from '../_services/natural-nutrients.service';
import { ImaggaTagsService } from '../_services/imagga-tags.service';
import { FoodNutritionDetails } from '../dtos/food-description-dto';
import {MatButtonModule} from '@angular/material/button';
import { ImaggaTaggerComponent } from '../imagga-tagger/imagga-tagger.component';
import { FoodNutritionListComponent } from '../food-nutrition-list/food-nutrition-list.component';
import { FoodNutritionDetailsComponent } from '../food-nutrition-details/food-nutrition-details.component';

@Component({
    selector: 'app-food-nutrition-container',
    standalone: true,
    imports: [MatButtonModule, ImaggaTaggerComponent, FoodNutritionListComponent, FoodNutritionDetailsComponent],
    templateUrl: './food-nutrition-container.component.html',
    styleUrl: './food-nutrition-container.component.css',
})
export class FoodNutritionContainerComponent implements OnInit {
    foodItem: FoodNutritionDetails[] | null = null;
    constructor(
        private _searchInstantService: SearchInstantService,
        private _naturalNutrientsService: NaturalNutrientsService,
        private _imaggaTagsService: ImaggaTagsService
    ) { }

    async ngOnInit() {
        // const response = await this._searchInstantService.searchInstant();
        // response.common.forEach((food: FoodNutritionDetails) => {
        //     console.log(food);
        // });

        // const response = await this._naturalNutrientsService.searchNaturalNutrients();
        // response.foods.forEach((food: FoodNutritionDetails) => {
        //     console.log(food);
        // });

        // console.log(response);

        // this.foodItem = response.foods;

        // const imaggaResponse = await this._imaggaTagsService.getImaggaImageTags();
        // console.log(imaggaResponse);
    }
}

/*

issues
1. when you upload photo, then go to users health and go back again, the photo is gone, but the results still there
suggestion: don't delete the photo, put it to the signal / service, or delete the photo and the results

2. codebase is not yet clean (last part)


improvements:
1. code efficiency (last part)
2. if i can use chart, use it on the:
    - food details
        - protein
        - fat
        - carbohydrates
        - etc

    - user health
    * not yet sure kung anong pwedeng gamitin dito para ma display at mapakita ng ayos yung data
    probably each data has its own pie or whatever chart *circle

    use Input Directive in donut chart

    display list of food intake - done

    compute list of food intake attributes and display to donut chart

*/
