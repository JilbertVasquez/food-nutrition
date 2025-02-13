import { Component, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ImaggaTagsService } from '../../_services/imagga-tags.service';
import { CommonModule } from '@angular/common';
import { ImaggaResponse, ImaggaTag } from '../../dtos/imagga-response';

@Component({
    selector: 'app-analyze-image',
    imports: [MatButtonModule, CommonModule],
    templateUrl: './analyze-image.component.html',
    styleUrl: './analyze-image.component.css',
})
export class AnalyzeImageComponent {
    imageSrc: Signal<string | ArrayBuffer | null>;
    resultTags: ImaggaTag[] | null = null;

    constructor(private _imaggaTagsService: ImaggaTagsService) {
        this.imageSrc = this._imaggaTagsService.imageSrc.asReadonly();
        if (this.imageSrc() == null) this._imaggaTagsService.imageTags.set(null);
    }

    async analyzeImage() {
        const base64Image = this.imageSrc();

        if (!base64Image) return;

        const imaggaResponse = await this._imaggaTagsService.getImaggaImageTags(base64Image);
        // imaggaResponse.result.tags.forEach((tag: ImaggaTag) => {
        //     console.log(tag.tag.en);
        // });
        const top10Tags = imaggaResponse.result.tags.slice(0, 10);
        this._imaggaTagsService.imageTags.set(top10Tags);
        console.log(top10Tags);
        // this.resultTags = top10Image;
        // top10Image.forEach((tag: any) => {
        //     console.log(tag.tag.en);
        // });

        // top10Image.forEach((tag: any) => {
        //     console.log(tag);
        //     console.log(tag["en"])
        // });
    }
}

