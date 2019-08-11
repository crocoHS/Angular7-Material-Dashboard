import { ImageLoaderDirective } from './image-loader.directive';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
/*

export class MockElementRef extends ElementRef {
    nativeElement = {};
}

describe( 'ImageLoaderDirective', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: ElementRef, useClass: MockElementRef }
            ]
        }).compileComponents();
    }));

    /!*it( 'should create an instance', () => {
        const directive = new ImageLoaderDirective();
        expect( directive ).toBeTruthy();
        // expect('').toEqual('');

    } );*!/
    it('should inject the component', inject([MockElementRef],
        (component: MockElementRef) => {
            expect(component).toBeTruthy();
        }));
} );

*/

@Component({
    template: `<img src="https://cok.com" appImageLoader>`
})
class TestComponent {
}

describe('MyDirective Test', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ImageLoaderDirective, TestComponent ]
            // schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
    }));


    it('should test', async(() => {
        expect(component).toBeTruthy();
        // expect(component.title).toEqual('app');
        // console.log()
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        const src = compiled.querySelector('img');
        expect(src.src).toContain('https://cok.com');
    }));

});
