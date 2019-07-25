import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProjectSettingProductDialogComponent } from '../project-setting-product-dialog/project-setting-product-dialog.component';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { IProduct, Product } from '../../../../../../../shared/models/product.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardProjectService } from '../../../../../../../core/services/dashboard-project/dashboard-project.service';

@Component( {
    selector: 'app-project-setting-product-table',
    templateUrl: './project-setting-product-table.component.html',
    styleUrls: [ './project-setting-product-table.component.scss' ]
} )
export class ProjectSettingProductTableComponent implements OnChanges {
    @Input() dataFromParent: Product[];
    public dataStore: Product[];
    public projectId: string;

    constructor( private dialog: MatDialog,
                 private ref: ChangeDetectorRef,
                 private router: ActivatedRoute,
                 private spinner: NgxSpinnerService,
                 private http: DashboardProjectService
    ) {
        this.projectId = this.router.snapshot.paramMap.get( 'id' );
    }

    addProduct() {
        const dialogRef = this.dialog.open( ProjectSettingProductDialogComponent, {
            maxWidth: '500px',
            width: '90vw',
            panelClass: [ 'product-dialog' ],
            data: this.projectId
        } );
        // Nantinya post ke Backend dan result nya tambah id nya
        dialogRef.afterClosed().subscribe( ( result: Product ) => {
            if ( result ) {
                this.dataStore.push( result );
            }
        } );
    }

    editProductsActive( data: Product ) {
        const index = this.dataStore.findIndex( val => val.id === data.id );
        this.dataStore[ index ].status = !data.status;
        const body: Partial<IProduct> = {
            isActive: data.status
        };
        this.spinner.show();
        this.http.updateProduct( this.projectId, data.id, body )
            .subscribe(
                res => {
                    this.spinner.hide();
                    this.dataStore[ index ] = new Product( res );
                }, err => {
                    this.dataStore[ index ].status = !data.status;
                    this.spinner.hide();
                }
            );
    }

    ngOnChanges( changes: SimpleChanges ): void {
        if ( changes.dataFromParent ) {
            this.dataStore = this.dataFromParent;
        }
    }

}
