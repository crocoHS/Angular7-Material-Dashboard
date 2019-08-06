import { Directive, EventEmitter, HostListener, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Subject, Subscription } from 'rxjs';

@Directive( {
    selector: '[appDebounceClick]'
} )
export class DebounceClickDirective implements OnInit, OnDestroy {
    @Input() debounceTime = 500;
    @Output() readonly debouncedClick = new EventEmitter<MouseEvent>();
    private readonly clicks = new Subject<MouseEvent>();
    private subscription: Subscription;
    private isBrowser = false;

    constructor( @Inject( PLATFORM_ID ) platformId: string ) {
        this.isBrowser = isPlatformBrowser( platformId );
    }

    @HostListener( 'click', [ '$event' ] )
    clickEvent( event: MouseEvent ) {
        event.preventDefault();
        event.stopPropagation();
        this.clicks.next( event );
    }

    private listenToClicks() {
        this.subscription = this.clicks
            .pipe( debounceTime( this.debounceTime ) )
            .subscribe( event => this.debouncedClick.emit( event ) );
    }

    ngOnDestroy(): void {
        if ( this.subscription ) {
            this.subscription.unsubscribe();
        }
    }

    ngOnInit(): void {
        this.listenToClicks();
    }

}
