import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DashboardProductService } from '../../../../../../core/services/dashboard-project/dashboard-product.service';
import { Product, ProductTagGroup } from '../../../../../../shared/models/product.model';
import { map, switchMap } from 'rxjs/operators';

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
        // stock: [ 0 ],
    } );
    // FORM GROUP Product TAGS / CATEGORY
    public formGroup2 = this.fb.group( {
        category: [],
        subCategory: [],
        infos: this.fb.group( {
            tags: [],
            info: []
        } )
    } );

    // Data Product Image
    public productImage: any[];
    // for Carousel
    public carouselImage = 0;
    // for Product
    public product: Product;
    // for Category
    public tag: ProductTagGroup;
    // for Sub Category
    public tagMulti: ProductTagGroup;
    // for Category Tag with Info
    public infos: ProductTagGroup;

    /////////////////////////////
    constructor( private fb: FormBuilder,
                 private router: ActivatedRoute,
                 private http: DashboardProductService ) {
        const params = this.router.snapshot.params;
        this.http.getProductById( params.prodId )
            .pipe(
                map( value => this.product = value ),
                switchMap( value => {
                    return this.http.getProductTagGroup( value.id );
                } ),
                map( value => this.setFormAndTags( this.product, value ) )
            )
            .subscribe( val => {
                console.log( this.product, 'Ini Produk' );
                console.log( this.tag, 'Ini Tag' );
                console.log( this.tagMulti, 'Ini tagMulti' );
                console.log( this.infos, 'Ini infos' );
            } );
    }

    ///////////////////////////
    // for Set All Form ///////
    setFormAndTags( product: Product, tags: ProductTagGroup[] ) {
        this.formGroup.setValue( {
            name: product.name,
            description: product.detail,
            price: product.price,
            minPrice: product.minBookingPrice
        } );

        if ( tags ) {
            tags.forEach( value => {
                if ( value.type === 'singleTag' ) {
                    this.tag = value;
                    if ( value.tag.length ) {
                        this.formGroup2.patchValue( {
                            category: value.tag[ 0 ].tag
                        } );
                    }
                } else if ( value.type === 'multipleTag' ) {
                    this.tagMulti = value;
                } else if ( value.type === 'multipleTagWithInfo' ) {
                    this.infos = value;
                }
            } );
        }
    }

    ///////////////////////////
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
    /*addSubCategory( event: MatChipInputEvent ): void {
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
    }*/

    /*removeSubCategory( tags ): void {
        const index = this.tagMulti.indexOf( tags );
        if ( index >= 0 ) {
            this.tagMulti.splice( index, 1 );
        }
    }*/

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
