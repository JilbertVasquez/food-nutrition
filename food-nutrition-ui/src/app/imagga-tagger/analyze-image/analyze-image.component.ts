import { Component, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ImaggaTagsService } from '../../_services/imagga-tags.service';
import { CommonModule } from '@angular/common';
import { ImaggaTag } from '../../dtos/imagga-response';
import { excludeTags } from '../../_utils/constants';

@Component({
    selector: 'app-analyze-image',
    imports: [MatButtonModule, CommonModule],
    templateUrl: './analyze-image.component.html',
    styleUrl: './analyze-image.component.css',
})
export class AnalyzeImageComponent {
    imageSrc: Signal<string | ArrayBuffer | null>;
    isAnalyzing: Signal<boolean>;

    constructor(private _imaggaTagsService: ImaggaTagsService) {
        this.imageSrc = this._imaggaTagsService.imageSrc.asReadonly();
        if (this.imageSrc() == null) this._imaggaTagsService.imageTags.set(null);

        this.isAnalyzing = this._imaggaTagsService.isAnalyzing.asReadonly();
    }

    async analyzeImage() {
        const base64Image = this.imageSrc();

        if (!base64Image) return;

        this._imaggaTagsService.isAnalyzing.set(true);
        const imaggaResponse = await this._imaggaTagsService.getImaggaImageTags(base64Image);
        const top10Tags = imaggaResponse.result.tags
            .filter(tag => !excludeTags.includes(tag.tag.en))
            .slice(0, 2);
            
        this._imaggaTagsService.imageTags.set(top10Tags);
    }
}

