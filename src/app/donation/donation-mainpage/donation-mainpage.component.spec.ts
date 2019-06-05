import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationMainpageComponent } from './donation-mainpage.component';

describe('DonationMainpageComponent', () => {
  let component: DonationMainpageComponent;
  let fixture: ComponentFixture<DonationMainpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationMainpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationMainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
