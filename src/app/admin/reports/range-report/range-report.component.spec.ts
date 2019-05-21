import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeReportComponent } from './range-report.component';

describe('RangeReportComponent', () => {
  let component: RangeReportComponent;
  let fixture: ComponentFixture<RangeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
