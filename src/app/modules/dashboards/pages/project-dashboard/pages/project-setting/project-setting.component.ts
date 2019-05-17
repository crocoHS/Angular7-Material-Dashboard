import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectSettingStatusTableComponent } from './project-setting-status-table/project-setting-status-table.component';
import { ProjectSettingProductTableComponent } from './project-setting-product-table/project-setting-product-table.component';

export interface IProducts {
    id: number;
    name: string;
    detail: string;
    price: number;
    status: boolean;
}

export interface IStatus {
    id: number;
    name: string;
    point: number;
    status: boolean;
}

export interface IProjectDetail {
    id: number;
    name: string;
    detail: string;
    statusActive: boolean;
    products: IProducts[];
    status: IStatus[];
}

const dataDummy: IProjectDetail = {
    id: 12,
    name: 'Project A',
    detail: 'Project Bombard the World',
    statusActive: true,
    products: [ {
        id: 1,
        name: 'Sebar money',
        detail: 'Bagi - bagi untuk untuk sobat misqueen',
        price: 5000000,
        status: true
    } ],
    status: [
        { id: 1, name: 'New Leads', point: 0, status: false },
        { id: 2, name: 'Interested', point: 5, status: true },
        { id: 3, name: 'Walk In', point: 10, status: true },
        { id: 4, name: 'Reservation', point: 15, status: true },
        { id: 5, name: 'Booking', point: 20, status: true },
        { id: 6, name: 'Closing', point: 100, status: true },
        { id: 7, name: 'Interested but Not Now', point: 1, status: true },
        { id: 8, name: 'Not Interested', point: 1, status: true },
        { id: 9, name: 'Callback', point: 0, status: false },
        { id: 10, name: 'No Response', point: 0, status: false },
        { id: 11, name: 'Inactive', point: 0, status: false },
        { id: 12, name: 'Invalid', point: 0, status: false },
        { id: 13, name: 'Very Interested', point: 30, status: true }
    ]
};

@Component( {
    selector: 'app-project-setting',
    templateUrl: './project-setting.component.html',
    styleUrls: [ './project-setting.component.scss' ]
} )
export class ProjectSettingComponent implements OnInit {
    // JIKA SUDAH ADA BACKEND KETIKA TOMBOL SAVE AKAN DI KIRIM KE POST PROJECT
    public dataProject: IProjectDetail;
    public dataSourceProduct: IProducts[];
    public dataSourceStatus: IStatus[];
    @ViewChild( 'settingProduct' ) dataProduct: ProjectSettingProductTableComponent;
    @ViewChild( 'settingStatus' ) dataStatus: ProjectSettingStatusTableComponent;

    constructor( private fb: FormBuilder, private location: Location ) {
    }

    public projectForm = this.fb.group( {
        name: [ '', [ Validators.required, Validators.min( 5 ) ] ],
        detail: [ '', [ Validators.required, Validators.min( 5 ) ] ],
        statusActive: []
    } );

    setProjectForm( data: IProjectDetail ) {
        this.projectForm.setValue( {
            name: data.name,
            detail: data.detail,
            statusActive: data.statusActive
        } );
    }

    // Ke post SERVICE dan redirect ke project detail
    onSave() {
        if ( this.projectForm.valid ) {
            Object.assign( this.dataProject, this.projectForm.value );
            this.dataProject.products = this.dataProduct.dataStore;
            this.dataProject.status = this.dataStatus.dataStore;
            this.location.back();
        }
    }

    ngOnInit() {
        this.dataProject = dataDummy;
        this.setProjectForm( this.dataProject );
        this.dataSourceProduct = this.dataProject.products;
        this.dataSourceStatus = this.dataProject.status;
    }

}
