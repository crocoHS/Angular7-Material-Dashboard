import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Project } from '../../../../../../shared/models/project.model';
import { DashboardProjectService } from '../../../../../../core/services/dashboard-project/dashboard-project.service';
import { Lead } from '../../../../../../shared/models/lead.model';
import { FormBuilder } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component( {
    selector: 'app-project-detail-lead',
    templateUrl: './project-detail-lead.component.html',
    styleUrls: [ './project-detail-lead.component.scss' ]
} )
export class ProjectDetailLeadComponent implements OnChanges, OnDestroy {
    @Input() dataProject: Project;
    @Input() dataLeads: Lead[];
    public dataAllLeads: Lead[];
    public dataForFilter;
    public dataForChart;
    public dataForTable: Lead[];

    constructor( private http: DashboardProjectService, private fb: FormBuilder ) {
        this.formFilter.valueChanges
            .pipe(
                untilDestroyed( this ),
                debounceTime( 500 ),
                // remove null and undefined value
                map( value => {
                    const x = value;
                    Object.keys( x ).forEach( ( key ) => ( ( x[ key ] === null ) || ( x[ key ] === undefined ) ) && delete x[ key ] );
                    return x;
                } )
            )
            .subscribe( result => {
                const arrOfKey = Object.keys( result );
                let allResult: Lead[] = this.dataAllLeads;
                arrOfKey.forEach( objKeys => {
                    allResult = allResult.filter( val => val[ objKeys ].id === result[ objKeys ] );
                } );
                this.dataForTable = allResult;
                this.dataForChart = this.forChart( allResult );
                // Dikomen karena set filter berdasarkan data leads awal fetch
                // this.dataForFilter = this.setForFilter(allResult);
            } );
    }

    public formFilter = this.fb.group( {
        getCampaign: [],
        getChannel: [],
        getSalesOfficer: [],
        getSalesTeam: [],
        getStatus: [],
        getCategory: [],
        getMedia: [],
    } );

    forChart( data: Lead[] ) {
        const objChart = {
            data: [],
            label: []
        };
        objChart.label = data.reduce( ( acc, cur ) => {
            const index = acc.findIndex( val => val === cur.getChannel.name );
            if ( index === -1 ) {
                acc.push( cur.getChannel.name );
            }
            return acc;
        }, [] );
        objChart.label.forEach( ( value, index ) => {
            data.forEach( value1 => {
                if ( value1.getChannel.name === value ) {
                    const labelIndex = objChart.data.findIndex( val => val.label === value1.getCategory.name );
                    if ( labelIndex !== -1 ) {
                        objChart.data[ labelIndex ].data[ index ] += 1;
                    } else {
                        objChart.data.push( {
                            data: Array.from( Array( objChart.label.length ), () => 0 ),
                            label: value1.getCategory.name
                        } );
                    }
                }
            } );
        } );
        console.log( objChart );
        return objChart;
    }

    functionGoblok( value: Lead[], method ) {
        return value.reduce( ( acc, cur ) => {
            const get = cur[ method ];
            const index = acc.findIndex( val => val.id === get.id );
            if ( index === -1 ) {
                acc.push( get );
            }
            return acc;
        }, [] );
    }

    setForFilter( value: Lead[] ) {
        return {
            getCampaign: this.functionGoblok( value, 'getCampaign' ),
            getChannel: this.functionGoblok( value, 'getChannel' ),
            getSalesOfficer: this.functionGoblok( value, 'getSalesOfficer' ),
            getSalesTeam: this.functionGoblok( value, 'getSalesTeam' ),
            getStatus: this.functionGoblok( value, 'getStatus' ),
            getCategory: this.functionGoblok( value, 'getCategory' ),
        };
    }

    ngOnChanges( data: SimpleChanges ): void {
        if ( data.dataLeads.currentValue ) {
            this.dataAllLeads = this.dataLeads;
            this.dataForTable = this.dataLeads;
            this.dataForFilter = this.setForFilter( this.dataLeads );
            this.dataForChart = this.forChart( this.dataLeads );
        }
    }

    ngOnDestroy(): void {
    }

}
