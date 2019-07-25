import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ImageData } from '../../../../shared/models/image-data.model';

@Component( {
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: [ './image-upload.component.scss' ]
} )
export class ImageUploadComponent implements OnInit, OnChanges {
    @Input() public imageUrl: string | ArrayBuffer = 'https://jala-testing.s3-ap-southeast-1.amazonaws.com/tenant/60db6180-ad80-11e9-b4b6-6578a1b671ed.jpg';
    @Output() getImage: EventEmitter<File> = new EventEmitter<File>();
    public isNewImage = true;
    public imageFile;

    constructor() {
    }

    uploadImage( files ) {
        const file: File = files[ 0 ];
        if ( file ) {
            this.imageFile = file;
            this.getImage.emit( this.imageFile );
            this.isNewImage = false;
            const reader = new FileReader();
            reader.readAsDataURL( file );
            reader.onload = ( ev ) => this.imageUrl = reader.result;
        }
    }

    ngOnInit() {
    }

    ngOnChanges( changes: SimpleChanges ): void {
        if ( changes.imageUrl ) {
            this.isNewImage = false;
        }
    }

}
