import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Component( {
    selector: 'app-option-dropdown',
    templateUrl: './option-dropdown.component.html',
    styleUrls: [ './option-dropdown.component.scss' ]
} )
export class OptionDropdownComponent implements OnInit {
    public isShowDropDown = false;
    public isHover = false;
    @Input() height: string;
    public custom;

    constructor( private elementRef: ElementRef ) {
    }

    @HostListener( 'document:click', [ '$event' ] )
    onClick( event ) {
        if ( !this.elementRef.nativeElement.contains( event.target ) ) {
            if ( this.isShowDropDown ) {
                this.showDropdown();
            }
        }
    }


    showDropdown() {
        this.isShowDropDown = !this.isShowDropDown;
    }

    ngOnInit(): void {
        if ( this.height ) {
            this.custom = { height: this.height, 'overflow-y': 'scroll' };
        }
    }

}
