import { Component, Input, OnInit } from '@angular/core';
import { IStatus } from '../project-setting.component';

@Component( {
    selector: 'app-project-setting-status-table',
    templateUrl: './project-setting-status-table.component.html',
    styleUrls: [ './project-setting-status-table.component.scss' ]
} )
export class ProjectSettingStatusTableComponent implements OnInit {
    @Input() dataFromParent: IStatus[];
    public dataStore: IStatus[];

    constructor() {
    }

    editStatusActive( data ) {
        this.dataStore[ data.id - 1 ].status = !data.status;
        console.log( this.dataStore );
    }

    editStatusPoint( index, newValue ) {
        if ( Number( newValue.value ) >= 0 ) {
            this.dataStore[ index ].point = Number( newValue.value );
        } else {
            this.dataStore[ index ].point = 0;
            newValue.value = 0;
        }
    }

    ngOnInit() {
        this.dataStore = this.dataFromParent;
    }

}
