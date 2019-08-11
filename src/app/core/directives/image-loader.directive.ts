import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive( {
    selector: '[appImageLoader]'
} )
export class ImageLoaderDirective {
    private svgUrl = 'assets/svg/loader.svg';
    private errorUrl = 'https://jala-testing.s3-ap-southeast-1.amazonaws.com/tenant/60db6180-ad80-11e9-b4b6-6578a1b671ed.jpg';
    private url: string;
    private newEl = this.renderer.createElement( 'div' );
    svgHtml = `<svg width="70%" height="70%" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff"
                style="position:absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
                <g fill="none" fill-rule="evenodd">
                    <g transform="translate(1 1)" stroke-width="2">
                        <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
                        <path d="M36 18c0-9.94-8.06-18-18-18">
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 18 18"
                                to="360 18 18"
                                dur="1s"
                                repeatCount="indefinite"></animateTransform>
                        </path>
                    </g>
                </g>
            </svg>`;

    constructor( private renderer: Renderer2,
                 private el: ElementRef ) {
        console.log( renderer );
        console.log( el );
        this.renderer.insertBefore( this.el.nativeElement.parentNode, this.newEl, this.el.nativeElement.firstChild );
        this.renderer.setProperty( this.newEl, 'innerHTML', this.svgHtml );
        this.renderer.setStyle( this.el.nativeElement.parentNode, 'position', 'relative' );
        // this.renderer.setStyle( this.newEl, 'background-position', 'center' );
        this.renderer.setStyle( this.newEl, 'background-color', 'lightgrey' );
        this.renderer.setStyle( this.newEl, 'position', 'absolute' );
        this.renderer.setStyle( this.newEl, 'top', '0' );
        this.renderer.setStyle( this.newEl, 'left', '0' );
        this.renderer.setStyle( this.newEl, 'z-index', '1' );
        this.renderer.setStyle( this.newEl, 'width', '100%' );
        this.renderer.setStyle( this.newEl, 'height', '100%' );
    }

    @HostListener( 'load' ) onLoad() {
        this.renderer.removeChild( this.el.nativeElement.parentNode, this.newEl );
    }

    @HostListener( 'error' ) onError() {
        this.renderer.setAttribute( this.el.nativeElement, 'src', this.errorUrl );
    }


}
