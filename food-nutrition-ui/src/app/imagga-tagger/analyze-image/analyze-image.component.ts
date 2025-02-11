import { Component, computed, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ImaggaTagsService } from '../../_services/imagga-tags.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-analyze-image',
    imports: [MatButtonModule, CommonModule],
    templateUrl: './analyze-image.component.html',
    styleUrl: './analyze-image.component.css',
})
export class AnalyzeImageComponent {
    imageSrc: Signal<string | ArrayBuffer | null>;
    resultTags: any;

    constructor(private _imaggaTagsService: ImaggaTagsService) {
        this.imageSrc = this._imaggaTagsService.imageSrc.asReadonly();
        if (this.imageSrc() == null) this.resultTags = null;
    }

    async analyzeImage() {
        const base64Image = this.imageSrc();

        if (!base64Image) return;

        const imaggaResponse = await this._imaggaTagsService.getImaggaImageTags(base64Image);
        imaggaResponse.result.tags.forEach((tag: any) => {
            console.log(tag.tag.en);
        });
        const top10Image = imaggaResponse.result.tags.slice(0, 10);
        this.resultTags = top10Image;
        // top10Image.forEach((tag: any) => {
        //     console.log(tag.tag.en);
        // });

        // top10Image.forEach((tag: any) => {
        //     console.log(tag);
        //     console.log(tag["en"])
        // });
    }
}
