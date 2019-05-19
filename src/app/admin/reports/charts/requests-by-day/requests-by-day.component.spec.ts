import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsByDayComponent } from './requests-by-day.component';

describe('RequestsByDayComponent', () => {
  let component: RequestsByDayComponent;
  let fixture: ComponentFixture<RequestsByDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsByDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsByDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
