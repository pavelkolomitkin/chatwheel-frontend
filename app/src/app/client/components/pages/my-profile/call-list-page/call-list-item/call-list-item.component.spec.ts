import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallListItemComponent } from './call-list-item.component';

describe('CallListItemComponent', () => {
  let component: CallListItemComponent;
  let fixture: ComponentFixture<CallListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
