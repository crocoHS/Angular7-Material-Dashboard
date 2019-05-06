import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ILead } from '../project-detail-lead/project-detail-lead.component';

@Component( {
    selector: 'app-project-detail',
    templateUrl: './project-detail.component.html',
    styleUrls: [ './project-detail.component.scss' ]
} )
export class ProjectDetailComponent implements OnInit {
// Harusnya di throw di list
    public project = [
        {
            id: 11,
            name: 'Project A',
            description: 'blasldasldas'
        },
        {
            id: 12,
            name: 'Project B',
            description: 'blasldasldas'
        }
    ];
    public projectInUsedData;
    // All Data Store
    public dummyData$: any[];
    // Data for Child
    public dataForChart: any;
    public dataForOverview: {
        leads: number,
        campaign: number,
        channel: number
    };
    // Data for Leads, Channel, Campaign Table
    public dataForLeadsComp: ILead[];
    // Data for Select Filter
    public dataForFilter: any;
    public filterGroup = new FormGroup( {
        campaign: new FormControl( '' ),
        channel: new FormControl( '' ),
        sales_officer: new FormControl( '' ),
        sales_team: new FormControl( '' ),
        status: new FormControl( '' ),
        category: new FormControl( '' ),
    } );

    constructor( private router: ActivatedRoute, private http: HttpClient ) {
    }

    // Gawe filter
    removeFalsy( obj ) {
        let newObj = {};
        Object.keys( obj ).forEach( ( prop ) => {
            if ( obj[ prop ] ) {
                newObj[ prop ] = obj[ prop ];
            }
        } );
        return newObj;
    }

    setSelectArray( arrayData, key ) {
        return Array.from( new Set( arrayData.map( ( item: any ) => item[ key ] ) ) );
    }

    setSelectArrayAll( arrayData: ILead[] ) {
        this.dataForFilter = {
            campaign: this.setSelectArray( arrayData, 'campaign' ),
            channel: this.setSelectArray( arrayData, 'channel' ),
            sales_officer: this.setSelectArray( arrayData, 'sales_officer' ),
            sales_team: this.setSelectArray( arrayData, 'sales_team' ),
            status: this.setSelectArray( arrayData, 'status' ),
            category: this.setSelectArray( arrayData, 'category' )
        };
    }

    getArrayFilter( arrayData, key ) {
        return arrayData.reduce( ( acc, arr ) => {
            if ( acc.indexOf( arr[ key ] ) === -1 ) {
                acc.push( arr[ key ] );
            }
            return acc;
        }, [] );
    }

    countArray( arrayData, key ) {
        return this.getArrayFilter( arrayData, key ).length;
    }

    /// SEK SEK OJOK NGGAWE IKI SEK
    forChart( arrayObject ) {
        let objectResult = {
            data: [],
            label: []
        };
        arrayObject.forEach( ( arr ) => {
            let id = objectResult.label.includes( arr.channel );
            if ( !id ) {
                return objectResult.label.push( arr.channel );
            }
        } );
        objectResult.label.forEach( ( x, i ) => {
            arrayObject.forEach( ( arr2 ) => {
                if ( arr2.channel === x ) {
                    const findIndex = objectResult.data.findIndex( y => y.label === arr2.category );
                    if ( findIndex !== -1 ) {
                        objectResult.data[ findIndex ].data[ i ] += 1;
                    } else {
                        objectResult.data.push( {
                            data: Array.from( Array( objectResult.label.length ), () => 0 ),
                            label: arr2.category
                        } );
                    }
                }
            } );
        } );
        return objectResult;
    }

    ngOnInit() {
        // Untuk mendapatkan detail project
        // Harusnya ambil dari API HTTP PROJECT
        // Dan akan dipass ke child berikutnya seperti detailnya untuk component setting
        this.router.paramMap.subscribe( ( params: ParamMap ) => {
            const getId = Number( params.get( 'id' ) );
            this.project.forEach( arr => {
                if ( arr.id === getId ) {
                    this.projectInUsedData = arr;
                }
            } );
        } );
        this.http.get( 'assets/data_palsu.json' )
            .subscribe( ( result: any[] ) => {
                    this.dummyData$ = result;
                    this.dataForChart = this.forChart( result );
                    this.dataForOverview = {
                        leads: result.length,
                        campaign: this.countArray( result, 'campaign' ),
                        channel: this.countArray( result, 'channel' )
                    };
                    this.dataForLeadsComp = result;
                    this.setSelectArrayAll( result );
                }
            );
        // Ini untuk subscribe listen filter dan merubah data untuk chart dan tabel lead
        this.filterGroup.valueChanges.subscribe( result => {
            let res = this.dummyData$;
            const obj = this.removeFalsy( result );
            const arrOfVal = Object.values( obj );
            const arrOfKeys = Object.keys( obj );
            if ( arrOfVal ) {
                arrOfKeys.forEach( ( arr, index ) => {
                    res = res.filter( el => el[ arr ] === arrOfVal[ index ] );
                } );
            }
            this.dataForLeadsComp = res;
            this.dataForChart = this.forChart( res );
        } );
    }

}
