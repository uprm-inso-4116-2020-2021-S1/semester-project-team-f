import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientInformationComponent } from './add-patient-information.component';

describe('AddPatientInformationComponent', () => {
  let component: AddPatientInformationComponent;
  let fixture: ComponentFixture<AddPatientInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPatientInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPatientInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
