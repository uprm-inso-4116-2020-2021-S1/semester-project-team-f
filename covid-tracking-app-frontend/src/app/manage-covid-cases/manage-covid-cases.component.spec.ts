import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCovidCasesComponent } from './manage-covid-cases.component';

describe('CovidCasesComponent', () => {
  let component: ManageCovidCasesComponent;
  let fixture: ComponentFixture<ManageCovidCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCovidCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCovidCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
