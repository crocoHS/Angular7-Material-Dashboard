import { TestBed } from '@angular/core/testing';

import { ApiUploadService } from './api-upload.service';

describe('ApiUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiUploadService = TestBed.get(ApiUploadService);
    expect(service).toBeTruthy();
  });
});
