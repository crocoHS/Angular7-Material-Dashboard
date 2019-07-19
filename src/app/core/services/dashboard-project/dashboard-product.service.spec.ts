import { TestBed } from '@angular/core/testing';

import { DashboardProductService } from './dashboard-product.service';

describe('DashboardProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardProductService = TestBed.get(DashboardProductService);
    expect(service).toBeTruthy();
  });
});
