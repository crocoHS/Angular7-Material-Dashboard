import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Status } from '../../../../../../../shared/models/status.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, distinctUntilKeyChanged } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component( {
    selector: 'app-project-setting-status-table',
    templateUrl: './project-setting-status-table.component.html',
    styleUrls: [ './project-setting-status-table.component.scss' ]
} )
export class ProjectSettingStatusTableComponent implements OnChanges, OnDestroy {
    @Input() dataFromParent: Status[];
    @Output() updateStatus: EventEmitter<Status> = new EventEmitter();
    statusToEmit: Subject<Status> = new Subject();
    public dataStore: Status[];

    constructor() {
        this.statusToEmit
            .pipe(
                untilDestroyed(this),
                debounceTime( 500 )
            )
            .subscribe( val => {
                this.updateStatus.emit( val );
            } );
    }

    editStatusActive( data: Status ) {
        const index = this.dataStore.findIndex( val => val.id === data.id );
        if ( index !== -1 ) {
            this.dataStore[ index ].status = !data.status;
            this.statusToEmit.next( this.dataStore[ index ] );
        }
    }

    editStatusPoint( idStatus, newValue ) {
        const index = this.dataStore.findIndex( val => val.id === idStatus );
        if ( Number( newValue.value ) >= 0 ) {
            this.dataStore[ index ].point = Number( newValue.value );
        } else {
            this.dataStore[ index ].point = 0;
            newValue.value = 0;
        }
        this.statusToEmit.next( this.dataStore[ index ] );
    }

    ngOnChanges( data: SimpleChanges ) {
        if ( data.dataFromParent ) {
            this.dataStore = this.dataFromParent;
        }
    }

    ngOnDestroy(): void {
    }

}
