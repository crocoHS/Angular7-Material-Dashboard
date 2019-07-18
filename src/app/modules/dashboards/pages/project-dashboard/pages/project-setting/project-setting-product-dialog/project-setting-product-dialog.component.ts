import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardProjectService } from '../../../../../../../core/services/dashboard-project/dashboard-project.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProduct, Product } from '../../../../../../../shared/models/product.model';
import { flatMap, map, take } from 'rxjs/operators';

@Component( {
    selector: 'app-project-setting-product-dialog',
    templateUrl: './project-setting-product-dialog.component.html',
    styleUrls: [ './project-setting-product-dialog.component.scss' ]
} )
export class ProjectSettingProductDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ProjectSettingProductDialogComponent>,
        @Inject( MAT_DIALOG_DATA ) public data,
        private fb: FormBuilder,
        private http: DashboardProjectService,
        private spinner: NgxSpinnerService
    ) {
    }

    formProduct = this.fb.group( {
        name: [ '', Validators.required ],
        price: [ '', [ Validators.required ] ],
        // stock: [ '' , [Validators.required]],
        detail: [ '', Validators.required ],
    } );

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit( result: FormGroup ) {
        if ( result.valid ) {
            this.spinner.show();
            const body: Partial<IProduct> = result.value;
            this.http.createProduct( this.data, body )
                .pipe(
                    map((value: IProduct[]) => value.map(val => new Product(val))),
                    take(1),
                    flatMap( val => val)
                )
                .subscribe(
                    res => {
                        console.log(res);
                        this.dialogRef.close( res );
                        this.spinner.hide();
                    }, err => {
                        this.spinner.hide();
                    } );
        }
    }

    ngOnInit(): void {
    }

}
