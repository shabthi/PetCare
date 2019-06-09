import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsNeedComponent } from './items-need.component';

describe('ItemsNeedComponent', () => {
  let component: ItemsNeedComponent;
  let fixture: ComponentFixture<ItemsNeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsNeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsNeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
