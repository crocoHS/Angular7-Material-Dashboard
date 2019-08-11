import { async, TestBed } from '@angular/core/testing';
import { BreadcrumbComponent } from './breadcrumb.component';
import { MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';

describe( 'BreadcrumbComponent', () => {
    // let component: BreadcrumbComponent;
    // let fixture: ComponentFixture<BreadcrumbComponent>;

    beforeEach( ( () => {
        TestBed.configureTestingModule( {
            imports: [ MatIconModule, RouterModule.forRoot([]) ],
            declarations: [ BreadcrumbComponent ]
        } )
            .compileComponents();
    } ) );

    it( 'should create',  () => {
        const fixture = TestBed.createComponent( BreadcrumbComponent );
        const component = fixture.debugElement.componentInstance;
        expect( component ).toBeTruthy();
    } );
} );
