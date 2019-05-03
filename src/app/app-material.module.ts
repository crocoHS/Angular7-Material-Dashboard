import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatButtonToggleModule,
    MatExpansionModule, MatInputModule, MatListModule, MatPaginatorModule,
    MatSnackBarModule, MatTableModule,
    MatToolbarModule,
    MatFormFieldModule, MatIconModule
} from '@angular/material';
import { ChartsModule } from 'ng2-charts';

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
    MatSnackBarModule,
    MatIconModule,
    /// CHART MODULE
    ChartsModule
];

@NgModule( {
    declarations: [],
    imports: [ ...MatModule ],
    exports: [ ...MatModule ]
} )
export class AppMaterialModule {
}
