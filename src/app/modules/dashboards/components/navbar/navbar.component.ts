import { AfterViewInit, Component, ElementRef, HostListener, Inject,  ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component( {
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [ './navbar.component.scss' ],
} )
export class NavbarComponent implements AfterViewInit {
    private isShow = false;
    constructor( @Inject( DOCUMENT ) document ) {
    }

    @ViewChild( 'nav' ) nav: ElementRef;

    @HostListener( 'window:scroll', [ '$event' ] )
    onWindowScroll( e ) {
        if ( window.pageYOffset > this.nav.nativeElement.clientHeight ) {
            const element = document.getElementById( 'navbar' );
            element.classList.add( 'bg-navbar--custom' );
        } else {
            const element = document.getElementById( 'navbar' );
            element.classList.remove( 'bg-navbar--custom' );
        }
    }

    show() {
        this.isShow = !this.isShow;
    }

    ngAfterViewInit() {
        // if ( window.innerWidth >= 1024 ) {
        //     this.collapse = 'closed';
        // } else {
        //     this.collapse = 'open';
        // }
    }

}
