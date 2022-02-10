import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableUserAvatarComponent } from './editable-user-avatar.component';

describe('EditableUserAvatarComponent', () => {
  let component: EditableUserAvatarComponent;
  let fixture: ComponentFixture<EditableUserAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableUserAvatarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableUserAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
