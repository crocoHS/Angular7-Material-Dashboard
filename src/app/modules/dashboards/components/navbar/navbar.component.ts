import { AfterViewInit, Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { animate, sequence, state, style, transition, trigger } from '@angular/animations';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/store';
import { Logout } from '../../../../core/store/auth/auth.actions';

@Component( {
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [ './navbar.component.scss' ],
    animations: [
        trigger( 'changeState', [
            state( 'state1', style( {
                transform: 'translateX(100%)skew(20deg)',
                display: 'none',
            } ) ),
            state( 'state2', style( {
                transform: 'translateX(0)skew(0deg)',
                display: 'block',
            } ) ),
            transition( 'state2 => state1', animate( '300ms ease-in' ) ),
            transition( 'state1 => state2', [
                sequence( [
                    animate( '0ms', style( {
                        display: 'block',
                        transform: 'translateX(100%) skew(20deg)'
                    } ) ),
                    animate( '300ms ease-out', style( {
                        transform: 'translateX(0)skew(0deg)',
                    } ) )
                ] )
            ] )
            // transition('state1 => state2', animate('700ms')),
        ] )
    ]
} )
export class NavbarComponent implements AfterViewInit {
    public isShow = false;
    public state = 'state1';

    constructor( @Inject( DOCUMENT ) document,
                 private store: Store<AppState> ) {
    }

    @ViewChild( 'nav' ) nav: ElementRef;

    @HostListener( 'window:scroll', [ '$event' ] )
    onWindowScroll( e ) {
        if ( window.pageYOffset > this.nav.nativeElement.clientHeight ) {
            const element = document.getElementById( 'navbar' );
            const elementSvg = document.querySelector( '.navbar-brand__svg' );

            element.classList.add( 'bg-navbar--custom' );
            if ( window.innerWidth > 768 ) {
                elementSvg.classList.add( 'navbar-brand__svg--dark' );
            }
        } else if ( window.pageYOffset < this.nav.nativeElement.clientHeight ) {
            const element = document.getElementById( 'navbar' );
            const elementSvg = document.querySelector( '.navbar-brand__svg' );

            element.classList.remove( 'bg-navbar--custom' );
            if ( window.innerWidth > 768 ) {
                elementSvg.classList.remove( 'navbar-brand__svg--dark' );
            }
        }
    }

    showUser() {
        // this.show = !this.show
        if ( this.state === 'state1' ) {
            this.state = 'state2';
        } else {
            this.state = 'state1';
        }
    }

    show() {
        this.isShow = !this.isShow;
        this.state = 'state1';
    }

    logout() {
        this.store.dispatch(new Logout());
    }

    ngAfterViewInit() {
        // if ( window.innerWidth >= 1024 ) {
        //     this.collapse = 'closed';
        // } else {
        //     this.collapse = 'open';
        // }
    }

}
