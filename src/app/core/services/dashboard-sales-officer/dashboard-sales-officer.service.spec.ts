import { TestBed } from '@angular/core/testing';

import { DashboardSalesOfficerService } from './dashboard-sales-officer.service';

describe('DashboardSalesOfficerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardSalesOfficerService = TestBed.get(DashboardSalesOfficerService);
    expect(service).toBeTruthy();
  });
});
