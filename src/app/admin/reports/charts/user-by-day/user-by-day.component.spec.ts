import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserByDayComponent } from './user-by-day.component';

describe('UserByDayComponent', () => {
  let component: UserByDayComponent;
  let fixture: ComponentFixture<UserByDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserByDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserByDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
