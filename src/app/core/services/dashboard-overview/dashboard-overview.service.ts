import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardOverviewService {
    private url = 'https://mersacs.com/api/';
    constructor( private http: HttpClient ) {
    }
    getDataLeads() {
        return this.http.get( this.url + 'leadsChart' );
    }
    getIseng() {
        return this.http.get( this.url + '/productListByProject/2' );
    }
}
