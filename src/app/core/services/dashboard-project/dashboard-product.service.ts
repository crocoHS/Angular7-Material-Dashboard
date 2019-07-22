import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {
    IProduct,
    IProductImage, IProductTag,
    IProductTagGroup,
    Product,
    ProductImage, ProductTag,
    ProductTagGroup
} from '../../../shared/models/product.model';
import { DashboardProjectService } from './dashboard-project.service';

@Injectable()
export class DashboardProductService {
    url = this.apiService.getUrl() + 'products/';
    tenantId = this.apiService.getTenantId().toString();

    constructor( private apiService: ApiService, private http: HttpClient, private projectService: DashboardProjectService ) {
    }

    //////////////// PRODUCT //////////////////////////
    getProductById( id ) {
        return this.http.get( this.url + `${ id }`, { params: { tenant_id: this.tenantId } } )
            .pipe(
                map( value => new Product( value ) )
            );
    }

    updateProductById( idProject, idProduct, body: Partial<IProduct> ) {
        return this.projectService.updateProduct( idProject, idProduct, body );
    }

    //////////////// PRODUCT IMAGE //////////////////////////
    getProductImages( id ) {
        return this.http.get( this.url + `${ id }/pictures`, { params: { tenant_id: this.tenantId } } )
            .pipe(
                map( ( value: IProductImage[] ) => value.map( val => new ProductImage( val ) ) )
            );
    }

    //////////////// PRODUCT TAG GROUP //////////////////////////
    getProductTagGroup( id ) {
        return this.http.get( this.url + `${ id }/tagGroups`, { params: { tenant_id: this.tenantId } } )
            .pipe(
                map( ( value: IProductTagGroup[] ) => value.map( val => new ProductTagGroup( val ) ) )
            );
    }

    //////////////// PRODUCT TAG //////////////////////////
    createProductTag( idProduct, body ) {
        return this.http.post( this.url + `${ idProduct }/tags`, [ body ], { params: { tenant_id: this.tenantId } } )
            .pipe(
                map( ( value: IProductTag[] ) => value.map( val => new ProductTag( val ) ) )
            );
    }

    deleteProductTag( idProduct, idTag ) {
        return this.http.delete( this.url + `${ idProduct }/tags/${ idTag }`, { params: { tenant_id: this.tenantId } } );
    }

    updateProductTag( idProduct, idTag, body: Partial<IProductTag> ) {
        return this.http.put( this.url + `${ idProduct }/tags/${ idTag }`, body, { params: { tenant_id: this.tenantId } } )
            .pipe(
                map( ( value: IProductTag ) =>  new ProductTag( value )  )
            );
    }
}
