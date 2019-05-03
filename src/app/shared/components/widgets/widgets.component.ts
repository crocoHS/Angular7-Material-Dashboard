import { Component, Input, OnInit } from '@angular/core';

@Component( {
    selector: 'app-widgets',
    templateUrl: './widgets.component.html',
    styleUrls: [ './widgets.component.scss' ]
} )
export class WidgetsComponent implements OnInit {
    @Input()color: string;
    @Input()icon: string;
    @Input()title: string;
    @Input()text: string;

    constructor() {
    }

    ngOnInit() {
    }

}
