import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ImaggaResponse, ImaggaTag } from '../dtos/imagga-response';

@Injectable({
    providedIn: 'root',
})
export class ImaggaTagsService {
    private _baseUrl = environment.imaggaBaseUrl;
    private _imaggaToken = environment.imaggaToken;

    imageSrc = signal<string | ArrayBuffer | null>(null);
    imageTags = signal<ImaggaTag[] | null>(null);

    isAnalyzing = signal<boolean>(false);

    constructor(private http: HttpClient) {}

    setImage(image: string | ArrayBuffer | null) {
        this.imageSrc.set(image);
    }

    getImaggaImageTags(image: string | ArrayBuffer) {
        const headers = new HttpHeaders({
            'Authorization': this._imaggaToken,
        });

        const formData = new FormData();
        formData.append('image_base64', image.toString().split(',')[1]);

        return lastValueFrom(this.http.post<ImaggaResponse>(this._baseUrl, formData, { headers }));
    }
}
