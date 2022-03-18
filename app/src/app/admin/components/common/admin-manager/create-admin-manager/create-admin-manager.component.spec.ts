import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdminManagerComponent } from './create-admin-manager.component';

describe('CreateAdminManagerComponent', () => {
  let component: CreateAdminManagerComponent;
  let fixture: ComponentFixture<CreateAdminManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAdminManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdminManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
