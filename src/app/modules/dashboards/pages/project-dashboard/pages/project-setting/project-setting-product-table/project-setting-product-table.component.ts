import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { IProducts } from '../project-setting.component';
import { ProjectSettingProductDialogComponent } from '../project-setting-product-dialog/project-setting-product-dialog.component';

@Component( {
    selector: 'app-project-setting-product-table',
    templateUrl: './project-setting-product-table.component.html',
    styleUrls: [ './project-setting-product-table.component.scss' ]
} )
export class ProjectSettingProductTableComponent implements OnInit {
    @Input() dataFromParent: IProducts[];
    public dataStore: IProducts[];

    constructor( private dialog: MatDialog, private ref: ChangeDetectorRef ) {
    }

    addProduct() {
        const dialogRef = this.dialog.open( ProjectSettingProductDialogComponent, {
            maxWidth: '500px',
            width: '90vw',
            panelClass: [ 'product-dialog' ],
        } );
        // Nantinya post ke Backend dan result nya tambah id nya
        dialogRef.afterClosed().subscribe( ( result ) => {
            if ( result ) {
                const finalResult: IProducts = {
                    id: 2,
                    name: result.name,
                    detail: result.detail,
                    price: result.price,
                    status: true
                };
                this.dataStore.push( finalResult );
                this.ref.markForCheck();
                console.log( this.dataStore );
            }
        } );
    }

    editProducts( data ) {
        const dialogRef = this.dialog.open( ProjectSettingProductDialogComponent, {
            maxWidth: '500px',
            width: '90vw',
            panelClass: [ 'product-dialog' ],
            data
        } );

        dialogRef.afterClosed().subscribe( ( result: IProducts ) => {
            if ( result ) {
                this.ref.markForCheck();
                console.log( this.dataStore );
            }
        } );
    }

    editProductsActive( data ) {
        this.dataStore[ data.id - 1 ].status = !data.status;
        console.log( this.dataStore );
    }

    ngOnInit(): void {
        this.dataStore = this.dataFromParent;
    }

}
