import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAdminManagerComponent } from './delete-admin-manager.component';

describe('DeleteAdminManagerComponent', () => {
  let component: DeleteAdminManagerComponent;
  let fixture: ComponentFixture<DeleteAdminManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAdminManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAdminManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
