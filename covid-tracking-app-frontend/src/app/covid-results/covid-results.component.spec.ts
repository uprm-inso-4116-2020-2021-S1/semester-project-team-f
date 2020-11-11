import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidResultsComponent } from './covid-results.component';

describe('CovidResultsComponent', () => {
  let component: CovidResultsComponent;
  let fixture: ComponentFixture<CovidResultsComponent>;

  beforeEach(async(() => {
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
