import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component( {
    selector: 'app-option-dropdown',
    templateUrl: './option-dropdown.component.html',
    styleUrls: [ './option-dropdown.component.scss' ],
} )
export class OptionDropdownComponent implements OnInit {
    public isShowDropDown = false;
    public isHover = false;
    constructor( private elementRef: ElementRef ) {
    }

    @HostListener( 'document:click', [ '$event', '$event.target' ] )
    onClick( event ) {
        if ( !this.elementRef.nativeElement.contains( event.target ) ) {
            if (this.isShowDropDown) {
                this.showDropdown();
            }
        }
    }


    showDropdown() {
        this.isShowDropDown = !this.isShowDropDown;
    }

    ngOnInit() {
    }

}
