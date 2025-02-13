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

    constructor(private http: HttpClient) {}

    setImage(image: string | ArrayBuffer | null) {
        this.imageSrc.set(image);
    }

    // getImaggaImageTags(image_url: string = 'https://www.jocooks.com/wp-content/uploads/2020/03/white-bread-1.jpg') {
    //     const headers = new HttpHeaders({
    //         'Authorization': this._imaggaToken,
    //     });

    //     const params = { image_url };

    //     const url = `${this._baseUrl}`;
    //     return lastValueFrom(this.http.get<any>(url, { headers, params }));
    // }

    getImaggaImageTags(image: string | ArrayBuffer) {
        const headers = new HttpHeaders({
            'Authorization': this._imaggaToken,
        });

        const formData = new FormData();
        formData.append('image_base64', image.toString().split(',')[1]);

        const params = { image_url: formData };

        const url = `${this._baseUrl}`;
        // return lastValueFrom(this.http.get<any>(url, { headers, params }));
        return lastValueFrom(this.http.post<ImaggaResponse>(url, formData, { headers }));
    }
}
