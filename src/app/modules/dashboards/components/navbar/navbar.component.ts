import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component( {
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [ './navbar.component.scss' ]
} )
export class NavbarComponent implements OnInit {
    private isShow = false;
    constructor( @Inject( DOCUMENT ) document ) {
    }

    @ViewChild( 'nav' ) nav: ElementRef;

    @HostListener( 'window:scroll', [ '$event' ] )
    onWindowScroll( e ) {
        if ( window.pageYOffset > this.nav.nativeElement.clientHeight ) {
            const element = document.getElementById( 'navbar' );
            element.classList.add( 'fixed-top' );
        } else {
            const element = document.getElementById( 'navbar' );
            element.classList.remove( 'fixed-top' );
        }
    }

    show() {
        this.isShow = !this.isShow;
    }

    ngOnInit() {
    }

}
