import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { IProject, Project } from '../../../shared/models/project.model';
import { ProjectStoreService } from '../../store/project/project-store.service';
import { Observable } from 'rxjs';
import { Campaign, ICampaign } from '../../../shared/models/campaign.model';
import { IStatus, Status } from '../../../shared/models/status.model';
import { IProduct, Product } from '../../../shared/models/product.model';
import { Channel, IChannel, IMedia, Media } from '../../../shared/models/channel.model';
import { ILead, Lead } from '../../../shared/models/lead.model';

@Injectable()
export class DashboardProjectService {
    // Kudune nggawe sing di comment //
    private url = this.apiService.getUrl() + 'projects';
    private urlCampaign = this.apiService.getUrl() + 'campaigns';
    private urlMedia = this.apiService.getUrl() + 'channels/medias';
    private urlLead = this.apiService.getUrl() + 'leads';
    private tenantId = this.apiService.getTenantId().toString();

    constructor( private apiService: ApiService, private http: HttpClient, private store: ProjectStoreService ) {
    }

    //////////////// PROJECT //////////////////////////
    getAllProjects() {
        return this.http.get( this.url, { params: { tenant_id: this.tenantId } } )
            .pipe(
                map( ( value: any[] ) => value.map( val => new Project( val ) ) ),
                tap( ( value: Project[] ) => this.store.project = value )
            );
    }

    getProjectById( id ) {
        return this.http.get( this.url + `/${ id }`, { params: { tenant_id: this.tenantId } } )
            .pipe(
                map( ( value: any[] ) => value.map( val => new Project( val ) ) ),
                // tap( ( value: Project[] ) => value.map( val => this.store.project.push( val ) ) )
            );
    }

    updateProject( projectId, body: Partial<Project> ) {
        return this.http.put( this.url + `/${ projectId }`, body, { params: { tenant_id: this.tenantId } } )
            .pipe(
                map( ( value: IProject ) => new Project( value ) ),
                tap( ( value: Project ) => this.store.updateProjectById$( value.id, value ) )
            );
    }

    createProject( body ) {
        return this.http.post( this.url, [ body ], { params: { tenant_id: this.tenantId } } );
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
            params: { tenant_id: this.tenantId }
        } )
            .pipe(
                map( ( value: ICampaign ) => new Campaign( value ) )
            );
    }

    createCampaign( idProject, body ) {
        return this.http.post( this.url + `/${ idProject }/campaigns`, body, {
            params: { tenant_id: this.tenantId }
        } );
    }

    //////////////// MEDIA CHANNEL //////////////////////////
    getAllMedias() {
        return this.http.get( this.urlMedia )
            .pipe(
                map( ( value: IMedia[] ) => value.map( val => new Media( val ) ) )
            );
    }

    getMediaById( idMedia ) {
        return this.http.get( this.urlMedia + `/${ idMedia }` )
            .pipe(
                map( ( value: IMedia ) => new Media( value ) )
            );
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

    updateProduct( idProject, idProduct, body: Partial<IProduct> ) {
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

    //////////////// CHANNEL //////////////////////////
    getAllChannel( idProject ) {
        return this.http.get( this.url + `/${ idProject }/channels`, { params: { tenant_id: this.tenantId } } )
            .pipe(
                map( ( value: IChannel[] ) => value.map( val => new Channel( val ) ) )
            );
    }

    getChannelById( idCampaign, idChannel ) {
        return this.http.get( this.urlCampaign + `/${ idCampaign }/channels/${ idChannel }`, { params: { tenant_id: this.tenantId } } )
            .pipe(
                map( ( value: IChannel ) => new Channel( value ) )
            );
    }

    updateChannel( idCampaign, idChannel, body ) {
        return this.http.put( this.urlCampaign + `/${ idCampaign }/channels/${ idChannel }`, body,
            { params: { tenant_id: this.tenantId } } )
            .pipe(
                switchMap( value => this.getChannelById( idCampaign, idChannel ) ),
            );
    }

    createChannel( idCampaign, body ) {
        return this.http.post( this.urlCampaign + `/${ idCampaign }/channels`, [ body ], { params: { tenant_id: this.tenantId } } )
            .pipe(
                switchMap( value => this.getChannelById( idCampaign, value[ 0 ].id ) ),
            );
    }

    //////////////// LEADS //////////////////////////
    getAllLeadsByProject( idProject ) {
        return this.http.get( this.urlLead, {
            params: { tenant_id: this.tenantId, project_id: idProject }
        } )
            .pipe(
                map( ( value: ILead[] ) => value.map( val => new Lead( val ) ) )
            );
    }
}
