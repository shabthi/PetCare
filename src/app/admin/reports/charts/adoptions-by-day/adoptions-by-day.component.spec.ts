import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionsByDayComponent } from './adoptions-by-day.component';

describe('AdoptionsByDayComponent', () => {
  let component: AdoptionsByDayComponent;
  let fixture: ComponentFixture<AdoptionsByDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptionsByDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptionsByDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
