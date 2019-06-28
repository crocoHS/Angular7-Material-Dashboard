import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';

@Component( {
    selector: 'app-bar-stacked-chart',
    templateUrl: './bar-stacked-chart.component.html',
    styleUrls: [ './bar-stacked-chart.component.scss' ]
} )
export class BarStackedChartComponent implements OnInit {
    @Input() dataParent;
    @ViewChild(BaseChartDirective) public chart: BaseChartDirective;
    constructor() {
    }

    public barChartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            datalabels: {
                display: false
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeOutExpo'
        },
        layout: {
            padding: {
                // left: 30,
                right: 30,
                top: 30,
                bottom: 30
            }
        },
        scales: {
            /*xAxes: [{
                stacked: true,
                scaleLabel: {
                    display: true
                },
                ticks: {
                    fontSize: 20,
                    fontFamily: 'Poppins'
                },
                gridLines: {
                    borderDash: [3, 4]
                }
            }],*/
            yAxes: [ {
                stacked: true,
                gridLines: {
                    display: false,
                },
                ticks: {
                    display: true,
                    beginAtZero: true,
                    fontColor: '#646c9a',
                    fontSize: 13,
                    padding: 10
                },
            } ],
            /*yAxes: [{
                stacked: true,
                scaleLabel: {
                    display: true
                },
                ticks: {
                    fontSize: 20,
                    fontFamily: 'Poppins'
                },
                gridLines: {
                    display: false
                },
                // barPercentage: 1.0,
                // categoryPercentage: 0.5,
                barThickness: 30,
                // maxBarThickness: 35,
            }]*/
            xAxes: [ {
                stacked: true,
                gridLines: {
                    color: '#646c9a',
                    offsetGridLines: false,
                    drawBorder: false,
                    drawTicks: false,
                    zeroLineWidth: 1,
                    borderDash: [ 3, 4 ],
                    zeroLineColor: '#646c9a'
                },
                ticks: {
                    display: true,
                    beginAtZero: true,
                    fontColor: '#646c9a',
                    fontSize: 13,
                    padding: 10
                }
            } ]
        },
        tooltips: {
            xPadding: 10,
            yPadding: 10,
            titleFontSize: 16,
            bodyFontSize: 14,
            bodyFontStyle: '300',
            bodySpacing: 8
        },
        legend: {
            fullWidth: true,
            labels: {
                fontSize: 14,
                fontFamily: 'Poppins',
            }
        }
    };
    public barChartLabels: Label[];
    public barChartType: ChartType = 'horizontalBar';
    public barChartLegend = true;
    public barChartPlugins = [];
    public barChartData: ChartDataSets[];
    public barChartColorScheme: Color[] = [
        {
            backgroundColor: 'rgba(88,153,218,.4)',
            borderColor: 'rgba(88,153,218,0)'
        },
        {
            backgroundColor: 'rgba(232,116,59,.4)',
            borderColor: 'rgba(232,116,59,0)'
        },
        {
            backgroundColor: 'rgba(25,169,121,.4)',
            borderColor: 'rgba(25,169,121,0)'
        },
        {
            backgroundColor: 'rgba(82,93,244,.4)',
            borderColor: 'rgba(82,93,244,0)'
        },
        {
            backgroundColor: 'rgba(148,94,207,.4)',
            borderColor: 'rgba(148,94,207,0)'
        },
        {
            backgroundColor: 'rgba(19,164,180,.4)',
            borderColor: 'rgba(19,164,180,0)'
        },
        {
            backgroundColor: 'rgba(237,74,123,.4)',
            borderColor: 'rgba(237,74,123,0)'
        }
    ];

    ngOnInit() {
        if ( window.innerWidth < 768 ) {
            this.barChartOptions.scales.yAxes = [ {
                stacked: true,
                gridLines: {
                    display: false,
                },
                ticks: {
                    display: true,
                    beginAtZero: true,
                    fontColor: '#646c9a',
                    fontSize: 13,
                    padding: 10
                }
            } ];
            this.barChartOptions.layout.padding = {
                left: 10,
                right: 10,
                top: 30,
                bottom: 30
            };
        }
    }
}
