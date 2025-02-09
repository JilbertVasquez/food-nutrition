import { Component, OnInit } from '@angular/core';
import { SearchInstantService } from './_services/search-instant.service';
import { FoodItem } from './dtos/food-description-dto';
import { NaturalNutrientsService } from './_services/natural-nutrients.service';
import { ImaggaTagsService } from './_services/imagga-tags.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    title = 'food-nutrition-ui';

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
