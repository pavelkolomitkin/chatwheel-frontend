import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserPickComponent } from './edit-user-pick.component';

describe('EditUserPickComponent', () => {
  let component: EditUserPickComponent;
  let fixture: ComponentFixture<EditUserPickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserPickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
