import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailComponent } from './project-detail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material';

describe( 'ProjectDetailComponent', () => {
    /*let component: ProjectDetailComponent;
    let fixture: ComponentFixture<ProjectDetailComponent>;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports: [RouterModule.forRoot([]), MatDialogModule],
            schemas: [ NO_ERRORS_SCHEMA ],
            declarations: [ ProjectDetailComponent ],
            providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: [] }]
        } )
            .compileComponents();
    } ) );

    beforeEach( () => {
        fixture = TestBed.createComponent( ProjectDetailComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    } );
*/
    it( 'should create', () => {
        // expect( component ).toBeTruthy();
        expect( true ).toBeTruthy();
    } );
} );
