import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component( {
    selector: 'app-project-setting-products',
    templateUrl: './project-setting-products.component.html',
    styleUrls: [ './project-setting-products.component.scss' ]
} )
export class ProjectSettingProductsComponent implements OnInit {
    // TODO: KEPIKIRIAN TERUS CARA NGGAWE CATEGORY

    // FORM GROUP Product
    public formGroup = this.fb.group( {
        name: [ '', Validators.required ],
        description: [ '', Validators.required ],
        price: [ '', [ Validators.required, Validators.pattern( '^[0-9]+$' ) ] ],
        minPrice: [ '' ],
    } );
    // Data Product Image
    public productImage: string[];
    // for Carousel
    public carouselImage = 0;

    constructor( private fb: FormBuilder ) {
    }

    changeImage( index: number ) {
        this.carouselImage = index;
    }

    ngOnInit() {
        // TODO: SUBSCRIBE KE PRODUCT ,PRODUCT CATEGORY ,PRODUCT IMAGE
        this.productImage =
            [ 'https://dummyimage.com/600x400/000/fff.jpg', 'https://dummyimage.com/1024x600/000/fff.jpg',
                'https://dummyimage.com/600x400/000/fff.jpg', 'https://dummyimage.com/1024x600/000/fff.jpg' ];
    }

}
