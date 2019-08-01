import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardProductService } from '../../../../../../core/services/dashboard-project/dashboard-product.service';
import { IProduct, Product, ProductTagGroup } from '../../../../../../shared/models/product.model';
import { map, switchMap, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

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
        subCategory: [ '', Validators.required ],
        infos: this.fb.group( {
            tag: [ '', Validators.required ],
            info: [ '', Validators.required ]
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
                 private route: Router,
                 private http: DashboardProductService,
                 private spinner: NgxSpinnerService ) {
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

    ///////////////////////////
    // for Create Tag Product/////
    addTags( controlName: 'subCategory' | 'infos' ) {
        if ( this.formGroup2.get( controlName ).valid ) {
            const body: any = {
                tagGroup: {
                    id: null
                },
                info: null,
                tag: null
            };
            if ( controlName === 'subCategory' ) {
                body.tag = this.formGroup2.get( controlName ).value;
                body.tagGroup.id = 2;
            } else if ( controlName === 'infos' ) {
                Object.assign( body, this.formGroup2.get( controlName ).value );
                body.tagGroup.id = 3;
            }
            this.spinner.show();
            this.http.createProductTag( this.product.id, body )
                .pipe(
                    tap( value => value.forEach( val => {
                        if ( val.tagGroupId === 2 ) {
                            this.tagMulti.tag.push( val );
                        } else if ( val.tagGroupId === 3 ) {
                            this.infos.tag.push( val );
                        }
                        this.formGroup2.get( controlName ).reset();
                        this.spinner.hide();
                    } ) )
                )
                .subscribe();
        }
    }

    deleteTags( idTag: number, controlName: 'subCategory' | 'infos' ) {
        this.spinner.show();
        this.http.deleteProductTag( this.product.id, idTag )
            .subscribe( value => {
                if ( controlName === 'subCategory' ) {
                    this.tagMulti.tag = this.tagMulti.tag.filter( val => val.id !== value );
                } else if ( controlName === 'infos' ) {
                    this.infos.tag = this.infos.tag.filter( val => val.id !== value );
                }
                this.spinner.hide();
            } );
    }

    /////////////////////////////////////////////////
    // Submit All Form
    submitAllForm() {
        if ( this.formGroup.valid && this.formGroup2.get( 'category' ).valid ) {
            const valueFormGroup1 = this.formGroup.value;
            const valueCategory = this.formGroup2.get( 'category' ).value;
            console.log( valueCategory );
            const body: Partial<IProduct> = {
                name: valueFormGroup1.name,
                detail: valueFormGroup1.description,
                price: valueFormGroup1.price,
                minBookingPrice: valueFormGroup1.minPrice
            };
            this.http.updateProductById( this.product.initialApi.project.id, this.product.id, body )
                .pipe(
                    switchMap( () => this.http.updateProductTag( this.product.id, this.tag.tag[ 0 ].id, { tag: valueCategory } ) ),
                )
                .subscribe( val => this.route.navigateByUrl( `dashboard/project/setting/${ this.product.initialApi.project.id }` ) );
        }
    }

    onCancel() {
        this.route.navigateByUrl( `dashboard/project/setting/${ this.product.initialApi.project.id }` );
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
