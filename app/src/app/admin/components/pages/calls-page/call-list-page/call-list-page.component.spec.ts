import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallListPageComponent } from './call-list-page.component';

describe('CallListPageComponent', () => {
  let component: CallListPageComponent;
  let fixture: ComponentFixture<CallListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
