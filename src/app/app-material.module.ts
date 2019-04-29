import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatButtonToggleModule,
    MatExpansionModule, MatInputModule, MatListModule, MatPaginatorModule,
    MatSnackBarModule, MatTableModule,
    MatToolbarModule,
    MatFormFieldModule
} from '@angular/material';

const MatModule = [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatSnackBarModule
];

@NgModule( {
    declarations: [],
    imports: [ ...MatModule ],
    exports: [ ...MatModule ]
} )
export class AppMaterialModule {
}
