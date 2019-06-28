import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-setting-product-dialog',
  templateUrl: './project-setting-product-dialog.component.html',
  styleUrls: ['./project-setting-product-dialog.component.scss']
})
export class ProjectSettingProductDialogComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<ProjectSettingProductDialogComponent>,
      @Inject( MAT_DIALOG_DATA ) public data,
      private fb: FormBuilder
  ) { }

    formProduct = this.fb.group( {
        name: [ '' , Validators.required],
        price: [ '' , [Validators.required]],
        stock: [ '' , [Validators.required]],
        detail: [ '' , Validators.required ],
    } );

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit(result: FormGroup) {
        if ( this.formProduct.valid ) {
            if ( this.data ) {
                this.dialogRef.close( Object.assign(this.data, result.value) );
            } else {
                this.dialogRef.close( result.value );
            }
        }
    }

    ngOnInit(): void {
        // console.log(this.data);
        if ( this.data != null ) {
            this.formProduct.setValue( {
                name: this.data.name,
                price: this.data.price,
                stock: this.data.stock,
                detail: this.data.detail,
            } );
        }
    }

}
