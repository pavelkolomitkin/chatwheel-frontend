import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypingComponent } from './user-typing.component';

describe('UserTypingComponent', () => {
  let component: UserTypingComponent;
  let fixture: ComponentFixture<UserTypingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTypingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTypingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
