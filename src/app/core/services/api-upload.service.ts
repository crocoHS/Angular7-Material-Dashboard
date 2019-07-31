import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IImageData, ImageData } from '../../shared/models/image-data.model';

@Injectable()
export class ApiUploadService {
    url = 'https://api.dev.jala.ai/pictures';

    constructor( private http: HttpClient ) {
    }

    uploadImage( file: File ) {
        const formData = new FormData();
        formData.append( 'pictures', file );
        return this.http.post( this.url, formData )
            .pipe(
                map( ( value: IImageData[] ) => new ImageData( value[ 0 ] ) )
            );
    }
}
