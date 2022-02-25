import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivityObserverComponent } from './user-activity-observer.component';

describe('UserActivityObserverComponent', () => {
  let component: UserActivityObserverComponent;
  let fixture: ComponentFixture<UserActivityObserverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserActivityObserverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActivityObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
