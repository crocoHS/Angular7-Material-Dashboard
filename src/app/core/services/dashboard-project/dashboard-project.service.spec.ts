import { TestBed } from '@angular/core/testing';

import { DashboardProjectService } from './dashboard-project.service';

describe('DashboardProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardProjectService = TestBed.get(DashboardProjectService);
    expect(service).toBeTruthy();
  });
});
