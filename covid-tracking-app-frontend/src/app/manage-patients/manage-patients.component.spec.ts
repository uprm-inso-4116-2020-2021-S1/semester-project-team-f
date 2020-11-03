import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePatientsComponent } from './manage-patients.component';

describe('AddPatientInformationComponent', () => {
  let component: ManagePatientsComponent;
  let fixture: ComponentFixture<ManagePatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
