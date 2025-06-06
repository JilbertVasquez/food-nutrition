import { Component, ElementRef, Signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { ImaggaTagsService } from '../../_services/imagga-tags.service';
import { NaturalNutrientsService } from '../../_services/natural-nutrients.service';
import { DialogService } from '../../_services/dialog.service';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-image-uploader',
    imports: [MatButtonModule, MatFormFieldModule, MatCardModule],
    templateUrl: './image-uploader.component.html',
    styleUrl: './image-uploader.component.css',
})
export class ImageUploaderComponent {
    @ViewChild('imageInput') imageInput!: ElementRef;
    imageSrc: Signal<string | ArrayBuffer | null>;

    constructor(
        private _imaggaTagsService: ImaggaTagsService,
        private _naturalNutrientsService: NaturalNutrientsService,
        private _dialogService: DialogService
    ) {
        this.imageSrc = this._imaggaTagsService.imageSrc.asReadonly();
    }

    onFileSelected(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                this._imaggaTagsService.imageSrc.set(reader.result);
                this._naturalNutrientsService.foodItem.set(null);
            };
            reader.readAsDataURL(file);
        }
    }

    async onDeletePhoto() {
        const modalRef = this._dialogService.confirmationModal(`Do you want to delete this photo?`).afterClosed();
        const isConfirm = await lastValueFrom(modalRef);

        if (!isConfirm) return;
        this._imaggaTagsService.imageSrc.set(null);
        this._imaggaTagsService.imageTags.set(null);
        this._naturalNutrientsService.foodItem.set(null);

        if (this.imageInput) {
            this.imageInput.nativeElement.value = '';
        }
    }
}
