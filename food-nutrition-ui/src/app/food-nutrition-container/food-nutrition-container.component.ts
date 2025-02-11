import { Component, OnInit } from '@angular/core';
import { SearchInstantService } from '../_services/search-instant.service';
import { NaturalNutrientsService } from '../_services/natural-nutrients.service';
import { ImaggaTagsService } from '../_services/imagga-tags.service';
import { FoodItem } from '../dtos/food-description-dto';
import {MatButtonModule} from '@angular/material/button';
import { ImaggaTaggerComponent } from '../imagga-tagger/imagga-tagger.component';

@Component({
    selector: 'app-food-nutrition-container',
    standalone: true,
    imports: [MatButtonModule, ImaggaTaggerComponent],
    templateUrl: './food-nutrition-container.component.html',
    styleUrl: './food-nutrition-container.component.css',
})
export class FoodNutritionContainerComponent implements OnInit {
    foodItem: FoodItem[] | null = null;
    constructor(
        private _searchInstantService: SearchInstantService,
        private _naturalNutrientsService: NaturalNutrientsService,
        private _imaggaTagsService: ImaggaTagsService
    ) { }

    async ngOnInit() {
        // const response = await this._searchInstantService.searchInstant();
        // response.common.forEach((food: any) => {
        //     console.log(food);
        // });

        const response = await this._naturalNutrientsService.searchNaturalNutrients();
        response.foods.forEach((food: any) => {
            console.log(food);
        });

        this.foodItem = response.foods;

        // const imaggaResponse = await this._imaggaTagsService.getImaggaImageTags();
        // console.log(imaggaResponse);
    }
}
