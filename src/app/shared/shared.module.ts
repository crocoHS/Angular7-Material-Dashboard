import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { AppMaterialModule } from '../app-material.module';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { BarStackedChartComponent } from './components/bar-stacked-chart/bar-stacked-chart.component';
import { OptionDropdownComponent } from './components/option-dropdown/option-dropdown.component';
import { OptionDropdownV2Component } from './components/option-dropdown-v2/option-dropdown-v2.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule( {
    declarations: [
        WidgetsComponent,
        LineChartComponent,
        BarChartComponent,
        BarStackedChartComponent,
        OptionDropdownComponent,
        OptionDropdownV2Component,
    ],
    exports: [
        WidgetsComponent,
        LineChartComponent,
        BarChartComponent,
        BarStackedChartComponent,
        OptionDropdownComponent,
        OptionDropdownV2Component,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        ReactiveFormsModule
    ]
} )
export class SharedModule {
}
