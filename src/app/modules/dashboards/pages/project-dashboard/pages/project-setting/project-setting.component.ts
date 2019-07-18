import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectSettingStatusTableComponent } from './project-setting-status-table/project-setting-status-table.component';
import { ProjectSettingProductTableComponent } from './project-setting-product-table/project-setting-product-table.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { map, switchMap, tap } from 'rxjs/operators';
import { Project } from '../../../../../../shared/models/project.model';
import { ProjectStoreService } from '../../../../../../core/store/project/project-store.service';
import { IStatus, Status } from '../../../../../../shared/models/status.model';
import { Observable } from 'rxjs';
import { DashboardProjectService } from '../../../../../../core/services/dashboard-project/dashboard-project.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from '../../../../../../shared/models/product.model';

@Component( {
    selector: 'app-project-setting',
    templateUrl: './project-setting.component.html',
    styleUrls: [ './project-setting.component.scss' ]
} )
export class ProjectSettingComponent implements OnInit, OnDestroy {
    // JIKA SUDAH ADA BACKEND KETIKA TOMBOL SAVE AKAN DI KIRIM KE POST PROJECT
    public dataProject: Project;
    public dataSourceProduct$: Observable<Product[]>;
    public dataSourceStatus: Status[];

    @ViewChild( 'settingProduct' ) dataProduct: ProjectSettingProductTableComponent;
    @ViewChild( 'settingStatus' ) dataStatus: ProjectSettingStatusTableComponent;

    constructor( private fb: FormBuilder,
                 private router: Router,
                 private route: ActivatedRoute,
                 private projectStore: ProjectStoreService,
                 private http: DashboardProjectService,
                 private spinner: NgxSpinnerService
    ) {
        this.route.paramMap
            .pipe(
                untilDestroyed( this ),
                map( ( params: ParamMap ) => Number( params.get( 'id' ) ) ),
                switchMap( id => {
                    return this.projectStore.getProjectById$( id );
                } )
            )
            .subscribe( val => {
                if ( !val ) {
                    this.router.navigateByUrl( '/dashboard/project/list' );
                } else {
                    this.setProjectForm( val );
                    this.dataProject = val;
                }
            } );
    }

    public projectForm = this.fb.group( {
        name: [ '', [ Validators.required, Validators.min( 5 ) ] ],
        detail: [ '', [ Validators.required, Validators.min( 5 ) ] ],
        isActive: []
    } );

    setProjectForm( data: Project ) {
        this.projectForm.setValue( {
            name: data.name,
            detail: data.detail,
            isActive: data.isActive
        } );
    }

    updateStatus( value ) {
        const backupIfError = this.dataSourceStatus;
        const body: Partial<IStatus> = {
            isActive: value.status,
            point: value.point
        };
        this.spinner.show();
        this.http.updateStatus( this.dataProject.id, value.id, body )
            .pipe(
                tap( () => this.spinner.hide() )
            )
            .subscribe(
                res => {
                    const newStatus = new Status( res );
                    const index = this.dataSourceStatus.findIndex( val => val.id === newStatus.id );
                    this.dataSourceStatus[index] = newStatus;
                }, err => {
                    this.dataSourceStatus = backupIfError;
                } );
    }

    // Ke post SERVICE dan redirect ke project detail
    onSave() {
        if ( this.projectForm.valid ) {
            Object.assign( this.dataProject, this.projectForm.value );
            this.router.navigateByUrl( '/dashboard/project/list' );
        }
    }

    ngOnInit() {
        this.http.getAllStatus( this.dataProject.id ).subscribe(val => this.dataSourceStatus = val);
        this.dataSourceProduct$ = this.http.getAllProducts( this.dataProject.id );
    }

    ngOnDestroy(): void {
    }

}
