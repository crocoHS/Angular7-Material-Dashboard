import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatChipsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule, MatOptionModule, MatTabsModule, MatRadioModule, MatStepperModule, MatSortModule
} from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { TagInputModule } from 'ngx-chips';
import { ToastrModule } from 'ngx-toastr';

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
    MatChipsModule,
    TagInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatTabsModule,
    MatRadioModule,
    MatStepperModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSortModule,
    /// CHART MODULE
    ChartsModule,
    /// TOAST MODULE
];

@NgModule( {
    declarations: [],
    imports: [ ...MatModule ],
    exports: [ ...MatModule ]
} )
export class AppMaterialModule {
}
