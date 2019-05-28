import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Params, PRIMARY_OUTLET, Router } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

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
        // distinctUntilChanged()
    ).subscribe(event => console.log(event));

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
    }

    buildBreadCrumb( route: ActivatedRoute, url: string = '',
                     breadcrumbs: Array<IBreadcrumb> = [] ): Array<IBreadcrumb> {
        // If no routeConfig is avalailable we are on the root path
        const label = route.routeConfig ? route.routeConfig.data.breadcrumb : 'Home';
        const path = route.routeConfig ? route.routeConfig.path : '';

        // In the routeConfig the complete path is not available,
        // so we rebuild it each time
        const nextUrl = `${ url }${ path }/`;
        const breadcrumb = {
            label,
            url: nextUrl
        };
        const newBreadcrumbs = [ ...breadcrumbs, breadcrumb ];
        if ( route.firstChild ) {
            // If we are not on our current path yet,
            // there will be more children to look after, to build our breadcumb
            return this.buildBreadCrumb( route.firstChild, nextUrl, newBreadcrumbs );
        }
        return newBreadcrumbs;
    }

    ngOnInit() {

    }


}
