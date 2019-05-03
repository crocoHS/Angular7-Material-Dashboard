import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardOverviewService {

    constructor( private http: HttpClient ) {
    }

    getDataLocal() {
        return this.http.get( './assets/MOCK_DATA.json' );
    }
}
