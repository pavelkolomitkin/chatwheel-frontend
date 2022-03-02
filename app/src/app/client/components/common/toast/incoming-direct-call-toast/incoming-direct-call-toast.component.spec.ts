import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingDirectCallToastComponent } from './incoming-direct-call-toast.component';

describe('IncomingDirectCallToastComponent', () => {
  let component: IncomingDirectCallToastComponent;
  let fixture: ComponentFixture<IncomingDirectCallToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomingDirectCallToastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingDirectCallToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
