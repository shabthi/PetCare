import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPetPostComponent } from './add-pet-post.component';

describe('AddPetPostComponent', () => {
  let component: AddPetPostComponent;
  let fixture: ComponentFixture<AddPetPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPetPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPetPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
