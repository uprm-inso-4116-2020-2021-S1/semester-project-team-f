import { TestBed } from '@angular/core/testing';

import { MedicalOfficeService } from './medical-office.service';

describe('MedicalOfficeService', () => {
  let service: MedicalOfficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalOfficeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
