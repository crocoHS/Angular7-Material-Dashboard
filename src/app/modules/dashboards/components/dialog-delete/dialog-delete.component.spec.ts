import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteComponent } from './dialog-delete.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material';

describe( 'DialogDeleteComponent', () => {
    let component: DialogDeleteComponent;
    let fixture: ComponentFixture<DialogDeleteComponent>;

    beforeEach( async( () => {
        TestBed.configureTestingModule( {
            imports: [ MatDialogModule ],
            declarations: [ DialogDeleteComponent ],
            providers: [ { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: [] } ]
        } )
            .compileComponents();
    } ) );

    beforeEach( () => {
        fixture = TestBed.createComponent( DialogDeleteComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    } );

    it( 'should create', () => {
        expect( component ).toBeTruthy();
    } );
} );
