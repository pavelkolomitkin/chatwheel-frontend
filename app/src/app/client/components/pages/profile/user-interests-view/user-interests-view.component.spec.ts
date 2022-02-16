import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInterestsViewComponent } from './user-interests-view.component';

describe('UserInterestsViewComponent', () => {
  let component: UserInterestsViewComponent;
  let fixture: ComponentFixture<UserInterestsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInterestsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInterestsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
