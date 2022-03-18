import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListFilterFormComponent } from './admin-list-filter-form.component';

describe('AdminListFilterFormComponent', () => {
  let component: AdminListFilterFormComponent;
  let fixture: ComponentFixture<AdminListFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListFilterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
