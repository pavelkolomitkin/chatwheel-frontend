import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectCallWindowComponent } from './direct-call-window.component';

describe('DirectCallWindowComponent', () => {
  let component: DirectCallWindowComponent;
  let fixture: ComponentFixture<DirectCallWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectCallWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectCallWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
