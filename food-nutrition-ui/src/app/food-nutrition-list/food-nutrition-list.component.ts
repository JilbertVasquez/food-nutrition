import { Component, Signal } from '@angular/core';
import { ImaggaTagsService } from '../_services/imagga-tags.service';
import { ImaggaTag } from '../dtos/imagga-response';

@Component({
  selector: 'app-food-nutrition-list',
  imports: [],
  templateUrl: './food-nutrition-list.component.html',
  styleUrl: './food-nutrition-list.component.css'
})
export class FoodNutritionListComponent {
    imageTags: Signal<ImaggaTag[] | null>;

    constructor(private _imaggaTagsService: ImaggaTagsService) {
        this.imageTags = this._imaggaTagsService.imageTags.asReadonly();
        console.log(this.imageTags());
    }
}
