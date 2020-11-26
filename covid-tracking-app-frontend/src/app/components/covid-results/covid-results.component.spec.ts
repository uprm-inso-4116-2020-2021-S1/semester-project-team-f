import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CovidResultsComponent } from './covid-results.component';

describe('CovidResultsComponent', () => {
  let component: CovidResultsComponent;
  let fixture: ComponentFixture<CovidResultsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
