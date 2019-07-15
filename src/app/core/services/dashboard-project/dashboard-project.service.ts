import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Project } from '../../../shared/models/project.model';
import { ProjectStoreService } from '../../store/project/project-store.service';

@Injectable()
export class DashboardProjectService {
    // Kudune nggawe sing di comment //
    url = this.apiService.getUrl() + 'projects';
    urlMedia = this.apiService.getUrl() + 'channels/medias';
    tenantId = this.apiService.getTenantId().toString();

    constructor( private apiService: ApiService, private http: HttpClient, private store: ProjectStoreService ) {
    }

    getProjectAll() {
        return this.http.get( this.url, { params: { tenant_id: this.tenantId } } )
            .pipe(
                map( ( value: any[] ) => value.map( val => new Project( val ) ) ),
                tap( ( value: Project[] ) => value.map( val => this.store.project.push( val ) ) )
            );
    }

    getProjectById( id ) {
        return this.http.get( this.url + `/${ id }`, { params: { tenant_id: this.tenantId } } )
            .pipe(
                map( ( value: any[] ) => value.map( val => new Project( val ) ) ),
                tap( ( value: Project[] ) => value.map( val => this.store.project.push( val ) ) )
            );
    }

    //////////////// CAMPAIGN //////////////////////////
    getCampaignAll( id ) {
        return this.http.get( this.url + `/${ id }/campaigns`, { params: { tenant_id: this.tenantId } } );
    }

    //////////////// MEDIA CHANNEL //////////////////////////
    getMediaAll() {
        return this.http.get( this.urlMedia );
    }
}
