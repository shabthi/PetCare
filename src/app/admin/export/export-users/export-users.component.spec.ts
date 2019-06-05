import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportUsersComponent } from './export-users.component';

describe('ExportUsersComponent', () => {
  let component: ExportUsersComponent;
  let fixture: ComponentFixture<ExportUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
