import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountSecondComponent } from './create-account-second.component';

describe('CreateAccountSecondComponent', () => {
  let component: CreateAccountSecondComponent;
  let fixture: ComponentFixture<CreateAccountSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccountSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
