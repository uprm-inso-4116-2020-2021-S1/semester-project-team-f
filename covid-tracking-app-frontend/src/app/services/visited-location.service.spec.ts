import { TestBed } from '@angular/core/testing';

import { VisitedLocationService } from './visited-location.service';

describe('VisitedLocationService', () => {
  let service: VisitedLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitedLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
