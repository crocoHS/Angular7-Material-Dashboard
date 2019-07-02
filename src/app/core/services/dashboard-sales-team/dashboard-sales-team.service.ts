import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardSalesTeamService {
    private url = this.apiService.getUrl() + '/sales-team';

    constructor( private apiService: ApiService, private http: HttpClient ) {
    }

    getAllSalesTeam() {
        return this.http.get( this.url );
    }
}
