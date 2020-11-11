import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeInformationComponent } from './office-information.component';

describe('OfficeInformationComponent', () => {
  let component: OfficeInformationComponent;
  let fixture: ComponentFixture<OfficeInformationComponent>;

  beforeEach(async(() => {
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
