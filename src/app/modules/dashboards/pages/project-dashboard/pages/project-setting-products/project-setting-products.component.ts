import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DashboardProductService } from '../../../../../../core/services/dashboard-project/dashboard-product.service';

@Component( {
    selector: 'app-project-setting-products',
    templateUrl: './project-setting-products.component.html',
    styleUrls: [ './project-setting-products.component.scss' ]
} )
export class ProjectSettingProductsComponent implements OnInit, OnDestroy {
    // FORM GROUP Product
    public formGroup = this.fb.group( {
        name: [ '', Validators.required ],
        description: [ '', Validators.required ],
        price: [ '', [ Validators.required, Validators.pattern( '^[0-9]+$' ) ] ],
        minPrice: [ '' ],
        stock: [ 0 ],
    } );
    // FORM GROUP Product TAGS / CATEGORY
    public formGroup2 = this.fb.group( {
        category: [ '' ],
        subCategory: [ '' ],
        infos: this.fb.array( [] )
    } );

    // Data Product Image
    public productImage: any[];
    // for Carousel
    public carouselImage = 0;
    // for Sub Category
    public tagMulti: any[] = [];
    readonly separatorKeysCodes: number[] = [ ENTER, COMMA ];
    // for Category Tag with Info
    public infos: any[] = [];

    /////////////////////////////
    constructor( private fb: FormBuilder,
                 private router: ActivatedRoute,
                 private http: DashboardProductService ) {
        const params = this.router.snapshot.params;
        this.http.getProductTagGroup( params[ 'prodId' ] )
            .subscribe( val => console.log( val ) );
    }

    // for Image Upload /////
    addImage( files ) {
        // const file: File = inputRef.files[0];
        const reader = new FileReader();
        reader.readAsDataURL( files[ 0 ] );
        reader.onload = ( ev ) => this.productImage.push( reader.result );
    }

    /////////////////////////

    // for Price Form
    changeMinPrice() {
        const price = this.formGroup.get( 'price' ).value;
        const minPrice = this.formGroup.get( 'minPrice' ).value;
        if ( price <= minPrice ) {
            this.formGroup.get( 'minPrice' ).setValue( price );
        }
    }

    // for change Main Image Carousel
    changeImage( index: number ) {
        this.carouselImage = index;
    }

    // For Sub Category ///////////////
    addSubCategory( event: MatChipInputEvent ): void {
        const input = event.input;
        const value = event.value;
        // Add our fruit
        if ( ( value || '' ).trim() ) {
            this.tagMulti.push( { name: value.trim() } );
        }
        // Reset the input value
        if ( input ) {
            input.value = '';
        }
    }

    removeSubCategory( tags ): void {
        const index = this.tagMulti.indexOf( tags );
        if ( index >= 0 ) {
            this.tagMulti.splice( index, 1 );
        }
    }

    ///////////////////////////////////
    // for Category Tag with Info
    get infosFormGroup() {
        return this.formGroup2.get( 'infos' ) as FormArray;
    }

    addInfo() {
        this.infosFormGroup.push( this.fb.group( {
            name: [ null, Validators.required ],
            value: [ null, Validators.required ],
        } ) );
        console.log( this.infosFormGroup.value );
    }

    deleteInfo( index ) {
        this.infosFormGroup.removeAt( index );
    }

    /////////////////////////////////////////////////
    // Submit All Form
    submitAllForm() {
        console.log( this.formGroup.value, this.formGroup2.value );
    }

    ngOnInit() {
        // TODO: SUBSCRIBE KE PRODUCT ,PRODUCT CATEGORY ,PRODUCT IMAGE
        /*this.productImage =
            [ 'https://dummyimage.com/600x400/000/fff.jpg', 'https://dummyimage.com/1024x600/000/fff.jpg',
                'https://dummyimage.com/600x400/000/fff.jpg', 'https://dummyimage.com/1024x600/000/fff.jpg' ];*/
        this.productImage = [];
    }

    ngOnDestroy(): void {
    }
}
