import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackLocationComponent } from './track-location.component';

describe('TrackLocationComponent', () => {
  let component: TrackLocationComponent;
  let fixture: ComponentFixture<TrackLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
