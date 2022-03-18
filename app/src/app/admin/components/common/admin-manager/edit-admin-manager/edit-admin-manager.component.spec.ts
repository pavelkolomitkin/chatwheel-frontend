import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminManagerComponent } from './edit-admin-manager.component';

describe('EditAdminManagerComponent', () => {
  let component: EditAdminManagerComponent;
  let fixture: ComponentFixture<EditAdminManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdminManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
