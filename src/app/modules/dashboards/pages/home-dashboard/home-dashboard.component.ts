import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewChild
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/store';
import { DashboardOverviewService } from '../../../../core/services/dashboard-overview/dashboard-overview.service';
import * as moment from 'moment';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { dummyData, DummyData } from './dummy';
import { dummy2 } from './dummy2';
import { dummy3 } from './dummy3';

@Component( {
    selector: 'app-home-dashboard',
    templateUrl: './home-dashboard.component.html',
    styleUrls: [ './home-dashboard.component.scss' ]
} )
export class HomeDashboardComponent implements OnInit, OnDestroy, AfterContentInit {

    //////

    constructor(
        private store: Store<AppState>,
        private http: DashboardOverviewService,
        private fb: FormBuilder,
        private renderer: Renderer2
    ) {
        this.checkBoxCategory.valueChanges
            .pipe(
                debounceTime( 1000 ),
                untilDestroyed( this )
            )
            .subscribe( val => {
                this.updateChart( val );
            } );
    }

    public storeData;
    public dataForChart1$: { data: number[], label: string }[] = [ { data: [], label: '' } ];
    public labelForChart1$ = [];
    public myFilter = new FormControl( '' );
    public checkBoxCategory = this.fb.group( {
        all: [ { value: true, disabled: true } ],
        hot: [],
        warm: [],
        new_leads: [],
        cold: [],
        closed: [],
        unqualified: [],
    } );
    public maxDate = moment().format();
    ///// UNTUK CHART BAR SEMUA
    dataParent: DummyData[];
    dataForChildChart = [];
    selected = 0;
    selectedTeam = 0;
    forChildChart;
    forChildChart2;
    forChildChart3;
    @ViewChild( 'testColor' ) testColor;
    @ViewChild( 'testColor2' ) testColor2;
    ////// Untuk Filter Floating
    @ViewChild( 'rowFixed' ) rowSticky: ElementRef;
    @ViewChild( 'rowMoving' ) rowMoving: ElementRef;
    public floatHeight;
    public floatPos;

    @HostListener( 'window:scroll', [ '$event' ] )
    onScroll() {
        if ( this.floatPos < window.pageYOffset ) {
            const cobakpos = window.pageYOffset - this.floatPos;
            this.renderer.setStyle( this.rowMoving.nativeElement, 'top', `${ cobakpos + 90 }px` );
        } else {
            this.renderer.setStyle( this.rowMoving.nativeElement, 'top', `0` );
        }
    }

    //////

    updateChart( data: any ) {
        const timeChart = this.timeForChart( this.myFilter.value.begin, this.myFilter.value.end );
        const arrData = Object.keys( data );
        const trueData = arrData.filter( val => val !== 'all' ? data[ val ] : false );
        const falseData = arrData.filter( val => val !== 'all' ? !data[ val ] : false );
        const resData = this.generateDataSeries( trueData, timeChart );
        falseData.forEach( cat => {
            const index = this.dataForChart1$.findIndex( val => val.label === cat );
            if ( index !== -1 ) {
                this.dataForChart1$.splice( index, 1 );
            } else {
                this.dataForChart1$ = [ ...[ this.dataForChart1$[ 0 ] ], ...resData ];
            }
        } );
    }

    // TODO: Tinggal ganti cara untuk tambah data, digawe mari ae
    changeDate() {
        const timeChart = this.timeForChart( this.myFilter.value.begin, this.myFilter.value.end );
        const range = this.generateLabel( this.myFilter.value.begin, this.myFilter.value.end, timeChart );
        this.labelForChart1$ = range;
        this.dataForChart1$ = this.generateDataSeries( 'all', timeChart );
        this.checkBoxCategory.reset( { all: true } );
    }

    groupData( data: any ) {
        return data.reduce( ( acc, cur ) => {
            const check = acc[ cur.category ] || null;
            if ( check === null ) {
                acc[ cur.category ] = [ ...[ cur ] ];
            } else {
                acc[ cur.category ].push( cur );
            }
            return acc;
        }, {} );
    }

    generateLabel( startDate, endDate, time ) {
        // label ["27-Apr-2019", "28-Apr-2019", "29-Apr-2019", "30-Apr-2019", "1-May-2019", "2-May-2019", "3-May-2019"]
        const jancok = [];
        const different = moment( endDate ).diff( moment( startDate ), time.time );
        if ( different <= 30 ) {
            for ( let i = 0; i < different + 1; i++ ) {
                const kerek = moment( startDate ).add( i, time.time ).format( time.format );
                jancok.push( kerek );
            }
        } else if ( different <= 90 ) {
            for ( let i = 0; i < different; i++ ) {
                const kerek = moment( startDate ).startOf( time.time ).add( i, time.time ).format( time.format );
                const isBetweenOrSame = moment( kerek, time.format ).isBetween( startDate, endDate, time.time )
                    || moment( kerek, time.format ).isSame( startDate, time.time )
                    || moment( kerek, time.format ).isSame( endDate, time.time );
                if ( isBetweenOrSame ) {
                    jancok.push( kerek );
                } else {
                    break;
                }
            }
        } else if ( different > 90 ) {
            for ( let i = 0; i < different; i++ ) {
                const kerek = moment( startDate ).startOf( time.time ).add( i, time.time ).format( time.format );
                const isBetweenOrSame = moment( kerek, time.format ).isBetween( startDate, endDate, time.time )
                    || moment( kerek, time.format ).isSame( startDate, time.time )
                    || moment( kerek, time.format ).isSame( endDate, time.time );
                if ( isBetweenOrSame ) {
                    jancok.push( kerek );
                } else {
                    break;
                }
            }
        }
        return jancok;
    }

    timeForChart( startDate, endDate ) {
        const different = moment( endDate ).diff( moment( startDate ), 'days' );
        if ( different <= 30 ) {
            return { time: 'days', format: 'D MMMM' };
        } else if ( different <= 90 ) {
            return { time: 'week', format: 'D MMMM YY' };
        } else if ( different > 90 ) {
            return { time: 'month', format: 'MMM YYYY' };
        }
    }

    generateDataSeries( category: any, time: any ) {
        let arrObj: { data: number[], label: string }[] = [];
        const obj = {
            data: Array.from( Array( this.labelForChart1$.length ), () => 0 ),
            label: category
        };
        if ( category !== 'all' ) {
            if ( Array.isArray( category ) ) {
                const jancok = [];
                category.forEach( cat => {
                    const thisObj = {
                        data: Array.from( Array( this.labelForChart1$.length ), () => 0 ),
                        label: cat
                    };
                    this.storeData[ cat ].forEach( arr => {
                        const index = this.labelForChart1$.findIndex( res =>
                            moment( res, time.format ).isSame( moment( arr.date ), time.time )
                        );
                        if ( arr.category === thisObj.label ) {
                            thisObj.data[ index ]++;
                        }
                    } );
                    return jancok.push( thisObj );
                } );
                arrObj = [ ...jancok ];
            }
            /*else {
                this.storeData[ category ].forEach( arr => {
                    const index = this.labelForChart1$.findIndex( res =>
                        moment( res, time.format ).isSame( moment( arr.date ), time.time )
                    );
                    if ( arr.category === obj.label ) {
                        obj.data[ index ]++;
                    }
                } );
                arrObj.push( obj );
            }*/
        } else if ( category === 'all' ) {
            for ( const objectKeys in this.storeData ) {
                for ( const arr of this.storeData[ objectKeys ] ) {
                    const index = this.labelForChart1$.findIndex( res =>
                        moment( res, time.format ).isSame( moment( arr.date ), time.time )
                    );
                    if ( index !== -1 ) {
                        obj.data[ index ]++;
                    }
                }
            }
            // coro iki rodok lemot
            /*const allCategory = Object.keys( this.storeData );
            allCategory.forEach( cat => {
                this.storeData[ cat ].forEach( arr => {
                    const index = this.labelForChart1$.findIndex( res =>
                        moment( res, time.format ).isSame( moment( arr.date ), time.time )
                    );
                    obj.data[ index ]++;
                } );
            } );*/
            arrObj.push( obj );
        }
        return arrObj;
    }

    // UNTUK BAR CHART nomer 1 & 2
    mappingData( selectedValue ) {
        const result = {};
        this.dataParent[ selectedValue ].data.forEach( obj => {
            Object.keys( obj ).forEach( key => {
                result[ key ] = ( result[ key ] || [] ).concat( [ obj[ key ] ] );
            } );
        } );
        return result;
    }

    changeChart2( selectedValue ) {
        this.forChildChart2 = this.dataForChildChart[ selectedValue ];
    }

    changeChart1( selectedValue ) {
        this.forChildChart = this.mappingData( selectedValue );
    }

    test() {
        ////// Gawe Bar Chart //////////
        const randColor = () => Math.round( Math.random() * 255 );
        const randData = Math.round( Math.random() * this.forChildChart.name.length - 1 );
        const color = `rgba(${ randColor() },${ randColor() },${ randColor() },0.4)`;
        this.testColor.barChartColorScheme[ 0 ][ 'backgroundColor' ][ randData ] = color;
        this.testColor.chart.chart.update();
    }

    test2() {
         ////// Gawe Stacked Chart //////////
        const randColor = () => Math.round(Math.random() * 255);
        const randData = Math.round(Math.random() * 2);
        const color = `rgba(${randColor()},${randColor()},${randColor()},0.4)`;
        this.forChildChart2.data[randData]['backgroundColor'] = color;
        this.testColor2.chart.chart.update();
    }

    ///////////////////////////////////

    ngOnInit() {
        const startDate = moment().subtract( 30, 'days' );
        const endDate = moment();
        this.http.getDataLeads().subscribe( val => {
            this.storeData = this.groupData( val );
            const timeChart = this.timeForChart( startDate, endDate );
            const range = this.generateLabel( startDate, endDate, timeChart );
            this.labelForChart1$ = range;
            this.dataForChart1$ = this.generateDataSeries( 'all', this.timeForChart( startDate, endDate ) );
        } );
        this.myFilter.setValue( {
            begin: startDate.format(),
            end: endDate.format()
        } );
        /// UNTUK BAR CHART
        this.dataParent = dummyData;
        this.changeChart1( this.selected );
        this.dataForChildChart = dummy2;
        this.changeChart2( this.selectedTeam );
        this.forChildChart3 = dummy3;
    }

    ngOnDestroy(): void {
    }

    ngAfterContentInit(): void {
        this.floatHeight = this.rowMoving.nativeElement.clientHeight;
        this.floatPos = Number( window.pageYOffset + this.rowSticky.nativeElement.getBoundingClientRect().top );
    }
}
