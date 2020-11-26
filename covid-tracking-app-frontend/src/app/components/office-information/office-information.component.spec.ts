import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OfficeInformationComponent } from './office-information.component';

describe('OfficeInformationComponent', () => {
  let component: OfficeInformationComponent;
  let fixture: ComponentFixture<OfficeInformationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
