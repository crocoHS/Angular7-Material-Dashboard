import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardProductService } from '../../../../../../core/services/dashboard-project/dashboard-product.service';
import { IProduct, IProductImage, Product, ProductImage, ProductTagGroup } from '../../../../../../shared/models/product.model';
import { map, switchMap, tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiUploadService } from '../../../../../../core/services/api-upload.service';
import { ImageData } from '../../../../../../shared/models/image-data.model';

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

    // Data Params {prodId, id}
    public params;
    // Data Product Image
    public productImageUrl: string[];
    public productImage: ProductImage[];
    public newImageFile: File[] = [];
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
                 private http2: ApiUploadService,
                 private spinner: NgxSpinnerService ) {
        const params = this.router.snapshot.params;
        this.params = params;
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
    addImage( inputRef ) {
        const file: File = inputRef.files[ 0 ];
        this.newImageFile.push( file );
        const reader = new FileReader();
        reader.readAsDataURL( file );
        reader.onload = ( ev ) => this.productImageUrl.push( reader.result as string );
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
        console.log( this.carouselImage );
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
    /*
        TODO:   - Upload Image Multiple map ambil url dan title
                - Switch Map Tinggal Post Product Picture
    */
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
            this.http2.uploadMultipleImages( this.newImageFile )
                .pipe(
                    map( value => {
                        return value.map( ( val ): Partial<IProductImage> => {
                            return { path: val.fullPath, title: val.field };
                        } );
                    } ),
                    switchMap( ( val: Partial<IProductImage[]> ) => this.http.createProductImage( this.product.id, val ) ),
                    switchMap( () => this.http.updateProductById( this.product.initialApi.project.id, this.product.id, body ) ),
                    switchMap( () => this.http.updateProductTag( this.product.id, this.tag.tag[ 0 ].id, { tag: valueCategory } ) ),
                )
                .subscribe( val => this.route.navigateByUrl( `dashboard/project/setting/${ this.product.initialApi.project.id }` ) );
            /*this.http.updateProductById( this.product.initialApi.project.id, this.product.id, body )
                .pipe(
                    switchMap( () => this.http.updateProductTag( this.product.id, this.tag.tag[ 0 ].id, { tag: valueCategory } ) ),
                )
                .subscribe( val => this.route.navigateByUrl( `dashboard/project/setting/${ this.product.initialApi.project.id }` ) );*/
        }
    }

    onCancel() {
        this.route.navigateByUrl( `dashboard/project/setting/${ this.product.initialApi.project.id }` );
    }

    ngOnInit() {
        /*
        TODO:   - SUBSCRIBE KE PRODUCT ,PRODUCT CATEGORY ,PRODUCT IMAGE
                - Scenario untuk image product:
                    1) Fetch ImageProduct All
                        1.a variable productImageUrl[] hanya untuk URL
                        1.b variable productImage hanya untuk Class ProductImage[]
                        1.c variable newImageFile hanya untuk menampung file dan digunakan untuk upload
                    2) Ketika delete langsung delete method ae
                    3) Ketika upload new Image di Batch saja:
                        3.a get all newImageFile
                        3.b UploadImageMultiple
                        3.c Hasil ImageProduct di SwitchMap ke POST ImageProduct
        */
        this.http.getProductImages( this.params.prodId )
            .pipe(
                map( value => {
                    this.productImage = value;
                    return value.map( val => val.path );
                } )
            )
            .subscribe( val => {
                this.productImageUrl = val;
                console.log( val );
            } );
        // this.productImageUrl = [];
    }

    ngOnDestroy(): void {
    }
}
