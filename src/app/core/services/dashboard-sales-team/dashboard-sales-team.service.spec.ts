import { TestBed } from '@angular/core/testing';

import { DashboardSalesTeamService } from './dashboard-sales-team.service';

describe('DashboardSalesTeamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardSalesTeamService = TestBed.get(DashboardSalesTeamService);
    expect(service).toBeTruthy();
  });
});
