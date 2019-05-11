import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { AppMaterialModule } from '../app-material.module';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { BarStackedChartComponent } from './components/bar-stacked-chart/bar-stacked-chart.component';
import { OptionDropdownComponent } from './components/option-dropdown/option-dropdown.component';

@NgModule( {
    declarations: [
        WidgetsComponent,
        LineChartComponent,
        BarChartComponent,
        BarStackedChartComponent,
        OptionDropdownComponent,
    ],
    exports: [
        WidgetsComponent,
        LineChartComponent,
        BarChartComponent,
        BarStackedChartComponent,
        OptionDropdownComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule
    ]
} )
export class SharedModule {
}
