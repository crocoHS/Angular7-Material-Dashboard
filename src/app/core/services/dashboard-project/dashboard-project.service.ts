import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { Project } from '../../../shared/models/project.model';
import { ProjectStoreService } from '../../store/project/project-store.service';
import { Observable } from 'rxjs';
import { Campaign, ICampaign } from '../../../shared/models/campaign.model';
import { IStatus, Status } from '../../../shared/models/status.model';
import { IProduct, Product } from '../../../shared/models/product.model';

@Injectable()
export class DashboardProjectService {
    // Kudune nggawe sing di comment //
    url = this.apiService.getUrl() + 'projects';
    urlMedia = this.apiService.getUrl() + 'channels/medias';
    tenantId = this.apiService.getTenantId().toString();

    constructor( private apiService: ApiService, private http: HttpClient, private store: ProjectStoreService ) {
    }

    getAllProjects() {
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
    getAllCampaigns( id ) {
        return this.http.get( this.url + `/${ id }/campaigns`, { params: { tenant_id: this.tenantId } } )
            .pipe(
                map( ( value: any[] ) => value.map( val => new Campaign( val ) ) )
            );
    }

    updateCampaign( idProject, idCampaign, body ) {
        return this.http.put( this.url + `/${ idProject }/campaigns/${ idCampaign }`, body, {
            params: { tenant_id: this.tenantId },
            headers: { 'Content-Type': 'application/json' }
        } );
    }

    createCampaign( idProject, body ) {
        return this.http.post( this.url + `/${ idProject }/campaigns`, body, {
            params: { tenant_id: this.tenantId }
        } );
    }

    //////////////// MEDIA CHANNEL //////////////////////////
    getAllMedias() {
        return this.http.get( this.urlMedia );
    }

    //////////////// STATUS PROJECT //////////////////////////
    getAllStatus( idProject ): Observable<Status[]> {
        return this.http.get( this.url + `/${ idProject }/statuses`, { params: { tenant_id: this.tenantId } } )
            .pipe(
                map( ( value: any[] ) => value.map( val => new Status( val ) ) )
            );
    }

    updateStatus( idProject, idStatus, body: Partial<IStatus> ) {
        return this.http.put( this.url + `/${ idProject }/statuses/${ idStatus }`, body, {
            params: { tenant_id: this.tenantId },
            headers: { 'Content-Type': 'application/json' }
        } );
    }

    //////////////// PRODUCT PROJECT //////////////////////////
    getAllProducts( idProject ) {
        return this.http.get( this.url + `/${ idProject }/products`, { params: { tenant_id: this.tenantId } } )
            .pipe(
                map( ( value: any[] ) => value.map( val => new Product( val ) ) )
            );
    }

    updateProduct( idProject, idProduct, body: Partial<IStatus> ) {
        return this.http.put( this.url + `/${ idProject }/products/${ idProduct }`, body, {
            params: { tenant_id: this.tenantId },
            headers: { 'Content-Type': 'application/json' }
        } );
    }

    createProduct( idProject, body: Partial<IProduct> ) {
        return this.http.post( this.url + `/${ idProject }/products`, [ body ], {
            params: { tenant_id: this.tenantId },
            headers: { 'Content-Type': 'application/json' }
        } );
    }

}
