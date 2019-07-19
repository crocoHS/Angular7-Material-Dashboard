import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {
    IProductImage,
    IProductTagGroup,
    Product,
    ProductImage,
    ProductTagGroup
} from '../../../shared/models/product.model';

@Injectable()
export class DashboardProductService {
    url = this.apiService.getUrl() + 'products/';
    tenantId = this.apiService.getTenantId().toString();

    constructor( private apiService: ApiService, private http: HttpClient ) {
    }

    //////////////// PRODUCT //////////////////////////
    getProductById( id ) {
        return this.http.get( this.url + `${ id }`, { params: { tenant_id: this.tenantId } } )
            .pipe(
                map( value => new Product( value ) )
            );
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
}
