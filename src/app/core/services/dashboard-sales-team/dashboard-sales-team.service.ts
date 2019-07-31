import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ISalesTeam, SalesTeam, SalesTeamMersaCS } from '../../../shared/models/sales-team.model';
import { Observable } from 'rxjs';
import { CityCoverage } from '../../../shared/models/city-coverage.model';

@Injectable()
export class DashboardSalesTeamService {
    private url = this.apiService.getUrl() + 'teams';
    private tenantID = this.apiService.getTenantId().toString();

    constructor( private apiService: ApiService, private http: HttpClient ) {
    }

    getAllSalesTeam() {
        return this.http.get( this.url, { params: { tenant_id: this.tenantID } } )
            .pipe(
                map( ( value: ISalesTeam[] ) => value.map( val => new SalesTeam( val ) ) )
            );
    }

    getAllSalesTeamMersaCS(): Observable<SalesTeamMersaCS[]> {
        const url = this.apiService.getUrlmersacs() + 'sales-team';
        return this.http.get( url )
            .pipe(
                map( ( value: any[] ) => {
                    return value.map( val => new SalesTeamMersaCS( val ) );
                } )
            );
    }

    getAllCoveragesMersaCS(): Observable<CityCoverage[]> {
        const url = this.apiService.getUrlmersacs() + 'coverage';
        return this.http.get( url )
            .pipe(
                map( ( value: any[] ) => {
                    return value.map( val => new CityCoverage( val ) );
                } )
            );
    }
}
