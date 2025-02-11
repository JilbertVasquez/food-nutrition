import { Component } from '@angular/core';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';

@Component({
    selector: 'app-imagga-tagger',
    imports: [ImageUploaderComponent],
    templateUrl: './imagga-tagger.component.html',
    styleUrl: './imagga-tagger.component.css',
})
export class ImaggaTaggerComponent {}
