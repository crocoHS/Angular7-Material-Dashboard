import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { concatMap, flatMap, map, mergeAll, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ISalesOfficer, ISalesOfficerTeam, SalesOfficer } from '../../../shared/models/sales-officer.model';
import { from, Observable } from 'rxjs';

@Injectable()
export class DashboardSalesOfficerService {
    private url2 = this.apiService.getUrlmersacs() + 'sales-officer';
    private url = this.apiService.getUrl() + 'users';
    private tenantId = this.apiService.getTenantId().toString();

    constructor( private apiService: ApiService, private http: HttpClient ) {
    }

    getAllSalesOfficersMersaCS() {
        return this.http.get( this.url2 );
    }

    getSalesOfficersTeam( userId: number ): Observable<ISalesOfficerTeam[]> {
        return this.http.get<ISalesOfficerTeam[]>( this.url + `/${ userId }/members`, { params: { tenant_id: this.tenantId } } );
    }

    //////////////////// SALES OFFICERS ///////////////////////////////
    getSalesOfficer( userId ) {
        return this.http.get<ISalesOfficer>( this.url + `/${ userId }`, { params: { tenant_id: this.tenantId } } )
            .pipe(
                map( value => new SalesOfficer( value ) )
            );
    }

    getAllSalesOfficers() {
        return this.http.get( this.url, { params: { tenant_id: this.tenantId, search: 'role:salesofficer' } } )
            .pipe(
                map<ISalesOfficer[], SalesOfficer[]>( ( value: ISalesOfficer[] ) => value.map( ( val: ISalesOfficer ) => {
                    const x = new SalesOfficer( val );
                    this.getSalesOfficersTeam( val.id ).subscribe( val2 => x.teams = val2 );
                    return x;
                } ) )
            );
    }

    updateSalesOfficer( userId, body ) {
        let salesOfficer: SalesOfficer;
        return this.http.put<ISalesOfficer>( this.url + `/${ userId }`, body, { params: { tenant_id: this.tenantId } } )
            .pipe(
                tap( value => salesOfficer = new SalesOfficer( value ) ),
                switchMap( value => this.getSalesOfficersTeam( value.id ) ),
                map( value => {
                    salesOfficer.teams = value;
                    return salesOfficer;
                } )
            );
    }

    createSalesOfficer( body ) {
        let salesOfficer: SalesOfficer;
        return this.http.post<ISalesOfficer[]>( this.url, [ body ], { params: { tenant_id: this.tenantId } } )
            .pipe(
                tap( value => salesOfficer = new SalesOfficer( value[ 0 ] ) ),
                switchMap( value => this.getSalesOfficersTeam( value[ 0 ].id ) ),
                map( value => {
                    salesOfficer.teams = value;
                    return salesOfficer;
                } )
            );
    }
}
