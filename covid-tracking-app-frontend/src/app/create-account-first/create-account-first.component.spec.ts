import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountFirstComponent } from './create-account-first.component';

describe('CreateAccountFirstComponent', () => {
  let component: CreateAccountFirstComponent;
  let fixture: ComponentFixture<CreateAccountFirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccountFirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
