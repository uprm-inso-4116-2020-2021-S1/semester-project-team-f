import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddressInformationComponent } from './address-information.component';

describe('AddressInformationComponent', () => {
  let component: AddressInformationComponent;
  let fixture: ComponentFixture<AddressInformationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
