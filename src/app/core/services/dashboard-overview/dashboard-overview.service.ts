import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable()
export class DashboardOverviewService {
    private url = this.apiService.getUrl() + '/dashboard/';
    constructor( private http: HttpClient, private apiService: ApiService) {
    }
    getDataLeads() {
        return this.http.get( this.url + 'leadsChart' );
    }
    getIseng() {
        return this.http.get( this.url + '/productListByProject/2' );
    }
}
