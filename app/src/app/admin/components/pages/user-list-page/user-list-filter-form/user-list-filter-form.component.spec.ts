import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListFilterFormComponent } from './user-list-filter-form.component';

describe('UserListFilterFormComponent', () => {
  let component: UserListFilterFormComponent;
  let fixture: ComponentFixture<UserListFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListFilterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
