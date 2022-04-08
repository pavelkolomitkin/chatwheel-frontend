import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineUserNumberDynamicComponent } from './online-user-number-dynamic.component';

describe('OnlineUserNumberDynamicComponent', () => {
  let component: OnlineUserNumberDynamicComponent;
  let fixture: ComponentFixture<OnlineUserNumberDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineUserNumberDynamicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineUserNumberDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
