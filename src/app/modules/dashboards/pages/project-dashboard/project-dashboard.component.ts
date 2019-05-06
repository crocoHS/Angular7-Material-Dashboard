import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-dashboard',
  template: `
      <router-outlet></router-outlet>
  `,
  styles: []
})
export class ProjectDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
