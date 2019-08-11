import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDashboardComponent } from './project-dashboard.component';
import { RouterModule } from '@angular/router';

describe( 'ProjectDashboardComponent', () => {
    let component: ProjectDashboardComponent;
    let fixture: ComponentFixture<ProjectDashboardComponent>;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports: [ RouterModule.forRoot( [] ) ],
            declarations: [ ProjectDashboardComponent ]
        } )
            .compileComponents();
    } ) );

    beforeEach( () => {
        fixture = TestBed.createComponent( ProjectDashboardComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    } );

    it( 'should create', () => {
        expect( component ).toBeTruthy();
    } );
} );
