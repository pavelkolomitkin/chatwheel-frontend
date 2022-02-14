import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMapMarkComponent } from './user-map-mark.component';

describe('UserMapMarkComponent', () => {
  let component: UserMapMarkComponent;
  let fixture: ComponentFixture<UserMapMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMapMarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMapMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
