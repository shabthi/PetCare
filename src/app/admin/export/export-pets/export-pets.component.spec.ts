import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportPetsComponent } from './export-pets.component';

describe('ExportPetsComponent', () => {
  let component: ExportPetsComponent;
  let fixture: ComponentFixture<ExportPetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportPetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
