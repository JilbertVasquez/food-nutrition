import { Component } from '@angular/core';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { AnalyzeImageComponent } from './analyze-image/analyze-image.component';

@Component({
    selector: 'app-imagga-tagger',
    imports: [ImageUploaderComponent, AnalyzeImageComponent],
    templateUrl: './imagga-tagger.component.html',
    styleUrl: './imagga-tagger.component.css',
})
export class ImaggaTaggerComponent {}
