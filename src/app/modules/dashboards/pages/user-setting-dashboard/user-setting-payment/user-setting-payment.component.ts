import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { UserSettingPaymentDialogComponent } from '../user-setting-payment-dialog/user-setting-payment-dialog.component';
import { dataDummyPayment, Payment } from '../../../../../shared/models/payment.model';
import { map } from 'rxjs/operators';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogDeleteComponent } from '../../../components/dialog-delete/dialog-delete.component';

@Component( {
    selector: 'app-user-setting-payment',
    templateUrl: './user-setting-payment.component.html',
    styleUrls: [ './user-setting-payment.component.scss' ]
} )

export class UserSettingPaymentComponent implements OnInit {

    public dataSource = new MatTableDataSource<Payment>();
    public displayedColumns = [ 'no', 'type', 'qrcode', 'createdAt', 'updatedAt', 'action' ];
    @ViewChild( MatPaginator ) paginator: MatPaginator;
    @ViewChild( MatTable ) table: MatTable<Payment>;
    @ViewChild( MatSort ) sort: MatSort;

    constructor(
        private dialog: MatDialog,
        private spinner: NgxSpinnerService
    ) {
    }

    addPayment() {
        const dialogRef = this.dialog.open( UserSettingPaymentDialogComponent, {
            maxWidth: '500px',
            width: '90vw'
        } );
        dialogRef.beforeClosed()
            .subscribe( ( result ) => {
                if ( result ) {
                    // POST SERVICE
                    console.log( result );
                }
            } );
    }

    applyFilter( filterValue: string ) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if ( this.dataSource.paginator ) {
            this.dataSource.paginator.firstPage();
        }
    }

    deletePayment( value ) {
        const dialogRef = this.dialog.open( DialogDeleteComponent, {
            data: {
                title: 'Payment Delete Confirmation',
                body: 'Are You sure want delete this Payment ?'
            }
        } );
        dialogRef.beforeClosed()
            .subscribe( ( result: boolean ) => {
                if ( result ) {
                    this.spinner.show();
                    console.log( 'before', result );
                    setTimeout( () => {
                        this.spinner.hide();
                        console.log( 'wes close', result );
                    }, 2000 );
                }
            } );
    }


    ngOnInit() {
        this.dataSource.data = dataDummyPayment.map( val => new Payment( val ) );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

}
