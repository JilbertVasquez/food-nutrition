import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { ImaggaTagsService } from '../../_services/imagga-tags.service';

@Component({
    selector: 'app-image-uploader',
    imports: [MatButtonModule, MatFormFieldModule, MatCardModule],
    templateUrl: './image-uploader.component.html',
    styleUrl: './image-uploader.component.css',
})
export class ImageUploaderComponent {
    @ViewChild('imageInput') imageInput!: ElementRef;
    imageSrc = signal<string | ArrayBuffer | null>(null);

    constructor(private _imaggaTagsService: ImaggaTagsService) {}

    onFileSelected(event: Event): void {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this.imageSrc.set(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    onDeletePhoto() {
        this.imageSrc.set(null);
        this._imaggaTagsService.imageSrc.set(null);

        if (this.imageInput) {
            this.imageInput.nativeElement.value = '';
        }
    }
}
