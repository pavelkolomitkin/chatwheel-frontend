import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetAdminPasswordManagerComponent } from './reset-admin-password-manager.component';

describe('ResetAdminPasswordManagerComponent', () => {
  let component: ResetAdminPasswordManagerComponent;
  let fixture: ComponentFixture<ResetAdminPasswordManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetAdminPasswordManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetAdminPasswordManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
