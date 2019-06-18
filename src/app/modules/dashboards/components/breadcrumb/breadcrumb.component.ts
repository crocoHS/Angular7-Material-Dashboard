import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, pluck } from 'rxjs/operators';
import {untilDestroyed} from 'ngx-take-until-destroy';


@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
    public breadcrumbs$ = this.router.events.pipe(
        untilDestroyed(this),
        filter(event => event instanceof NavigationEnd),
        distinctUntilChanged(),
        map((value: NavigationEnd) => this.generateBreadcrumb(value))
    );
    public breadcrumbsRoute = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
    }

    generateBreadcrumb(route: NavigationEnd) {
        const arr = route.urlAfterRedirects.split('/').filter(val => {
            return val !== '' && val !== 'dashboard';
        });
        this.breadcrumbsRoute = [];
        if (arr.length !== 1) {
            arr.forEach((val, i) => {
                i === 0 ? this.breadcrumbsRoute.push(val) :
                    this.breadcrumbsRoute.push(`${this.breadcrumbsRoute[i - 1]}/${val}`);
            });
        } else {
            this.breadcrumbsRoute.push(arr);
        }
        return arr;
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}
