import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

interface IBreadcrumb {
    label: string;
    url: string;
}

@Component( {
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: [ './breadcrumb.component.scss' ]
} )
export class BreadcrumbComponent implements OnInit {
    public breadcrumbs$ = this.router.events.pipe(
        filter( event => event instanceof NavigationEnd ),
        distinctUntilChanged(),
        map(() => this.activatedRoute),
        map(route => route.firstChild),
        switchMap(route => route.data),
        map(data => data['breadcrumb'])
    ).subscribe(val => console.log(val));

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {

    }


}
