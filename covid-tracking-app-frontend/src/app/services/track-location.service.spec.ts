import { TestBed } from '@angular/core/testing';

import { TrackLocationService } from './track-location.service';

describe('TrackLocationService', () => {
  let service: TrackLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});