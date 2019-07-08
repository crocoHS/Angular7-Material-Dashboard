import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Project } from '../../../shared/models/project.model';

@Injectable()
export class DashboardProjectService {
    // Kudune nggawe sing di comment
    // url = this.apiService.getUrl() + '/';
    url = 'https://api.dev.jala.ai/rest/projects';
    tenantId = this.apiService.getTenantId();

    constructor( private apiService: ApiService, private http: HttpClient ) {
    }

    getProjectAll() {
        return this.http.get( this.url + `?tenant_id=${ this.tenantId }` ).pipe(
            map( ( value: any[] ) => value.map( val => new Project( val ) ) )
        );
    }

}
