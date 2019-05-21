import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsByDayComponent } from './pets-by-day.component';

describe('PetsByDayComponent', () => {
  let component: PetsByDayComponent;
  let fixture: ComponentFixture<PetsByDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetsByDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsByDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
