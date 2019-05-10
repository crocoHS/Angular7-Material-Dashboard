import { Component, Input, OnInit } from '@angular/core';
import { Color } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import * as ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
    @Input()data: {name: string[], value: number[]};
  constructor() { }
    public barChartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {display: false},
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'right',
                color: '#646c9a',
                offset: 0,
                font: {
                    family: 'Poppins',
                    size: 14
                }
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeOutExpo'
        },
        elements: {
            arc: {
                borderWidth: 0
            }
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
            yAxes: [{
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
            }],
            xAxes: [{
                gridLines: {
                    color: '#646c9a',
                    offsetGridLines: false,
                    drawBorder: false,
                    drawTicks: false,
                    zeroLineWidth: 1,
                    borderDash: [3, 4],
                    zeroLineColor: '#646c9a'
                },
                ticks: {
                    display: true,
                    beginAtZero: true,
                    fontColor: '#646c9a',
                    fontSize: 13,
                    padding: 10
                }
            }]
        }
    };
    public barChartType: ChartType = 'horizontalBar';
    public barChartLegend = true;
    public barChartPlugins = [ChartDataLabels];
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
  }

}
