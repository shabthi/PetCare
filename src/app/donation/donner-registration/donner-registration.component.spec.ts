import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonnerRegistrationComponent } from './donner-registration.component';

describe('DonnerRegistrationComponent', () => {
  let component: DonnerRegistrationComponent;
  let fixture: ComponentFixture<DonnerRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonnerRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonnerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
