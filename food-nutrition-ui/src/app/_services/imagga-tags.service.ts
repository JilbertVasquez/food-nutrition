import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ImaggaTagsService {
    private _baseUrl = environment.imaggaBaseUrl;
        private _imaggaToken = environment.imaggaToken;

        constructor(private http: HttpClient) {}

        getImaggaImageTags(image_url: string = 'https://www.jocooks.com/wp-content/uploads/2020/03/white-bread-1.jpg') {
            const headers = new HttpHeaders({
                'Authorization': this._imaggaToken,
            });

            const params = { image_url };

            const url = `${this._baseUrl}`;
            return lastValueFrom(this.http.get<any>(url, { headers, params }));
        }
}
