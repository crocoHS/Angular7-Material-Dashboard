import { AfterViewInit, Component, ElementRef, HostListener, Inject,  ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component( {
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [ './navbar.component.scss' ],
} )
export class NavbarComponent implements AfterViewInit {
    public isShow = false;
    constructor( @Inject( DOCUMENT ) document ) {
    }

    @ViewChild( 'nav' ) nav: ElementRef;

    @HostListener( 'window:scroll', [ '$event' ] )
    onWindowScroll( e ) {
        if ( window.pageYOffset > this.nav.nativeElement.clientHeight ) {
            const element = document.getElementById( 'navbar' );
            const elementSvg = document.querySelector( '.navbar-brand__svg' );
            element.classList.add( 'bg-navbar--custom' );
            elementSvg.classList.add('navbar-brand__svg--dark');
        } else {
            const element = document.getElementById( 'navbar' );
            const elementSvg = document.querySelector( '.navbar-brand__svg' );

            element.classList.remove( 'bg-navbar--custom' );
            elementSvg.classList.remove( 'navbar-brand__svg--dark' );
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
