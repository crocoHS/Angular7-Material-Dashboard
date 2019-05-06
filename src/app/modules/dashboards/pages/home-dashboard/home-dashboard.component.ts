import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/store';
import { DashboardOverviewService } from '../../../../core/services/dashboard-overview/dashboard-overview.service';
import * as moment from 'moment';
import { FormControl, Validators } from '@angular/forms';

@Component( {
    selector: 'app-home-dashboard',
    templateUrl: './home-dashboard.component.html',
    styleUrls: [ './home-dashboard.component.scss' ]
} )
export class HomeDashboardComponent implements OnInit {
    public storeData;
    public dataForChart1$ = [{data: [], label: ''}];
    public labelForChart1$ = [];
    public myFilter = new FormControl('');
    public maxDate = moment().format();
    constructor( private store: Store<AppState>, private http: DashboardOverviewService ) {
    }
    // TODO: kalau dibuat tanggal lebih dari satu bulan ngelag jancok
    //          tolong di benarkan
    changeDate() {
        const range = this.generateLabel(this.myFilter.value.begin, this.myFilter.value.end);
        this.labelForChart1$ = range;
        this.dataForChart1$ = this.groupCategory(this.storeData, range);
    }

    generateLabel( startDate, endDate ) {
        // label ["27-Apr-2019", "28-Apr-2019", "29-Apr-2019", "30-Apr-2019", "1-May-2019", "2-May-2019", "3-May-2019"]
        const jancok = [];
        const different = moment( endDate ).diff( moment( startDate ), 'days' );
        for ( let i = 0; i < different; i++ ) {
            const kerek = moment( startDate ).add( i, 'days' ).format( 'D-MMM-YYYY' );
            jancok.push( kerek );
        }
        return jancok;
    }

    generateCategory( data ) {
        const labelCategory = [];
        data.forEach( ( item ) => {
            if ( labelCategory.indexOf( item.category ) === -1 ) {
                labelCategory.push( item.category );
            }
        } );
        return labelCategory;
    }

    groupCategory( data, label ) {
        // dadine { data: [65, 59, 80, 81, 56, 55, 40], label: 'Hot Leads' }
        // format data {"date":"2017-08-21 07:20:43","category":"warm","source":"online"}
        // format label ["27-Apr-2019", "28-Apr-2019", "29-Apr-2019", "30-Apr-2019", "1-May-2019", "2-May-2019", "3-May-2019"]
        // ["hot", "cold", "closed", "unqualified", "warm", "new_leads"]
        console.time('testspeed');
        const labelCategory = this.generateCategory( data );
        labelCategory.push('all');
        const arr = [];
        // TODO: IKI MARAI LEMOT
        labelCategory.forEach( ( cat ) => {
            const obj = {
                data: [],
                label: cat,
                hidden: true
            };
            obj.data = label.map( array => {
                let asu;
                if ( cat !== 'all') {
                    asu = data.filter( val => {
                        return val.category === cat;
                    } );
                } else {
                    asu = data;
                    obj.hidden = false;
                }
                return asu.filter( val => {
                    return moment( val.date ).isSame( moment( array ), 'day' );
                } ).length;
            } );
            arr.push( obj );
        } );
        console.timeEnd('testspeed');
        return arr;
    }
    ngOnInit() {
        const startDate = moment().subtract( 30, 'days' );
        const endDate = moment();
        this.http.getDataLocal().subscribe( val => {
            const range = this.generateLabel(startDate, endDate);
            this.storeData = val;
            this.labelForChart1$ = range;
            this.dataForChart1$ = this.groupCategory(val, range);
        } );
        this.myFilter.setValue({
            begin: startDate.format(),
            end: endDate.format()
        });
    }
}
