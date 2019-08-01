import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';

interface IOptionDropdownV2 {
    id: number | string;
    name: string;
    value: boolean;
}

/*export const dataDummy: IOptionDropdownV2[] = [
    {
        id: 0,
        name: 'Test',
        value: false
    }, {
        id: 1,
        name: 'Iyoo',
        value: true
    }, {
        id: 2,
        name: 'Cook',
        value: true
    },
];*/

@Component( {
    selector: 'app-option-dropdown-v2',
    templateUrl: './option-dropdown-v2.component.html',
    styleUrls: [ './option-dropdown-v2.component.scss' ]
} )
export class OptionDropdownV2Component implements OnInit {
    @Input() dataParent: IOptionDropdownV2[];
    @Input() title: string;
    // Gawe Test, kudune false
    @Input() isWithFilter = true;
    @ViewChild( 'input' ) inputText: ElementRef;
    ////// For Show Dropdown /////
    public isShowDropDown = false;
    ////// For Show isHover /////
    public isHover = false;
    ////// For Checked All Checkbox /////
    public isAllCheck = false;
    public isAllCheckShow = true;
    ////// Data Store Backup Only with isWithFilter true /////
    public dataStore: IOptionDropdownV2[];
    public backUpDataStore: IOptionDropdownV2[];

    constructor( private elementRef: ElementRef, private cd: ChangeDetectorRef ) {
    }

    @HostListener( 'document:click', [ '$event' ] )
    onClick( event ) {
        if ( !this.elementRef.nativeElement.contains( event.target ) ) {
            if ( this.isShowDropDown ) {
                this.showDropdown();
                this.cd.detectChanges();
            }
        }
    }

    filterOption( filterValue: string ) {
        if ( !this.isAllCheck ) {
            const value = filterValue.trim().toLowerCase();
            if ( filterValue.trim().toLowerCase() !== '' ) {
                this.dataStore = this.backUpDataStore.filter( val => val.name.trim().toLowerCase().includes( value ) );
                this.isAllCheckShow = false;
            } else {
                this.dataStore = this.backUpDataStore;
                this.isAllCheckShow = true;
            }
        }
    }

    changesValue( value ) {
        const index = this.dataStore.findIndex( val => val.id === value.id );
        this.dataStore[ index ].value = !value.value;
    }

    changeAllValue( value ) {
        this.isAllCheck = value.checked;
        this.dataStore.forEach( val => val.value = value.checked );
        console.log( this.dataStore );
    }

    get getAllData(): IOptionDropdownV2[] {
        return this.dataStore;
    }

    get getAllDataTrue(): any[] {
        return this.dataStore.reduce( ( acc, cur ) => {
            if ( cur.value === true ) {
                acc.push( { id: cur.id, name: cur.name } );
            }
            return acc;
        }, [] );
    }

    showDropdown() {
        this.isShowDropDown = !this.isShowDropDown;
        if ( this.isWithFilter ) {
            this.filterOption( '' );
            this.inputText.nativeElement.value = '';
        }
    }

    ngOnInit() {
        if ( this.isWithFilter ) {
            this.backUpDataStore = this.dataParent;
        }
        this.dataStore = this.dataParent;
    }

}
