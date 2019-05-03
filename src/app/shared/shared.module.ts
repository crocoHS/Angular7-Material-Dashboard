import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { AppMaterialModule } from '../app-material.module';
import { LineChartComponent } from './components/line-chart/line-chart.component';

@NgModule( {
    declarations: [
        WidgetsComponent,
        LineChartComponent,
    ],
    exports: [
        WidgetsComponent,
        LineChartComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule
    ]
} )
export class SharedModule {
}
