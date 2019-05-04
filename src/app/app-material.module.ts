import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatButtonToggleModule,
    MatExpansionModule, MatInputModule, MatListModule, MatPaginatorModule,
    MatSnackBarModule, MatTableModule,
    MatToolbarModule,
    MatFormFieldModule, MatIconModule, MatDatepickerModule
} from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

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
    SatDatepickerModule,
    SatNativeDateModule,
    MatDatepickerModule,
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
