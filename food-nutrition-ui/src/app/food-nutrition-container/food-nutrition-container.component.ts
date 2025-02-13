import { Component, OnInit } from '@angular/core';
import { SearchInstantService } from '../_services/search-instant.service';
import { NaturalNutrientsService } from '../_services/natural-nutrients.service';
import { ImaggaTagsService } from '../_services/imagga-tags.service';
import { FoodNutritionDetails } from '../dtos/food-description-dto';
import {MatButtonModule} from '@angular/material/button';
import { ImaggaTaggerComponent } from '../imagga-tagger/imagga-tagger.component';
import { FoodNutritionListComponent } from '../food-nutrition-list/food-nutrition-list.component';

@Component({
    selector: 'app-food-nutrition-container',
    standalone: true,
    imports: [MatButtonModule, ImaggaTaggerComponent, FoodNutritionListComponent],
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
