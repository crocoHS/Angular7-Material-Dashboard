import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SalesTeam } from '../../../shared/models/sales-team.model';
import { Observable } from 'rxjs';
import { CityCoverage } from '../../../shared/models/city-coverage.model';

@Injectable()
export class DashboardSalesTeamService {
    private url = this.apiService.getUrlmersacs() + 'sales-team';

    constructor( private apiService: ApiService, private http: HttpClient ) {
    }

    getAllSalesTeam(): Observable<SalesTeam[]> {
        return this.http.get( this.url )
            .pipe(
                map( ( value: any[] ) => {
                    return value.map( val => new SalesTeam( val ) );
                } )
            );
    }

    getAllCoverages(): Observable<CityCoverage[]> {
        const url = this.apiService.getUrlmersacs() + 'coverage';
        return this.http.get( url )
            .pipe(
                map( ( value: any[] ) => {
                    return value.map( val => new CityCoverage( val ) );
                } )
            );
    }
}
