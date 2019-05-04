import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

@Component( {
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: [ './line-chart.component.scss' ]
} )
export class LineChartComponent implements OnChanges {
    @Input() data: ChartDataSets[];
    @Input() label: Label[];

    // public lineChartData: ChartDataSets[] ;
    // public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    // public lineChartOptions: (ChartOptions & { annotation: any }) = {
    public lineChartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        tooltips: {
            mode: 'x-axis',
            intersect: false
        },
        scales: {
            // We use this empty structure as a placeholder for dynamic theming.
            xAxes: [ {
                display: true,
                scaleLabel: {
                    display: false
                },
                type: 'time',
                ticks: {
                    display: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                    fontColor: '#373737',
                    fontSize: 13,
                    padding: 10
                },
                gridLines: {
                    display: false
                }
            } ],
            yAxes: [ {
                display: true,
                ticks: {
                    maxTicksLimit: 12,
                    stepSize: 1,
                    display: true,
                    fontColor: '#373737',
                    fontSize: 13,
                    padding: 10
                },
                gridLines: {
                    color: '#373737',
                    drawBorder: false,
                    offsetGridLines: false,
                    drawTicks: false,
                    borderDash: [ 3, 4 ],
                    zeroLineWidth: 1,
                    zeroLineColor: '#373737',
                    zeroLineBorderDash: [ 3, 4 ]
                },
            } ]
        }
    };
    public lineChartColors: Color[] = [
        {
            backgroundColor: 'rgba(88,153,218,.4)',
            borderColor: 'rgba(88,153,218,1)'
        },
        {
            backgroundColor: 'rgba(232,116,59,.4)',
            borderColor: 'rgba(232,116,59,1)'
        },
        {
            backgroundColor: 'rgba(25,169,121,.4)',
            borderColor: 'rgba(25,169,121,1)'
        },
        {
            backgroundColor: 'rgba(82,93,244,.4)',
            borderColor: 'rgba(82,93,244,1)'
        },
        {
            backgroundColor: 'rgba(148,94,207,.4)',
            borderColor: 'rgba(148,94,207,1)'
        },
        {
            backgroundColor: 'rgba(19,164,180,.4)',
            borderColor: 'rgba(19,164,180,1)'
        },
        {
            backgroundColor: 'rgba(237,74,123,.4)',
            borderColor: 'rgba(237,74,123,1)'
        }
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';
    public lineChartPlugins = [];

    @ViewChild( BaseChartDirective ) chart: BaseChartDirective;

    constructor() {
    }

    ngOnChanges() {
    }

}
