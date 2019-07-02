import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardSalesOfficerService {
    private url = this.apiService.getUrl() + '/sales-officer';

    constructor( private apiService: ApiService, private http: HttpClient ) {
    }

    getAllSalesOfficers() {
        return this.http.get(this.url);
    }
}
