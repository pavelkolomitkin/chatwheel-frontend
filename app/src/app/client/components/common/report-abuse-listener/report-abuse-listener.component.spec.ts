import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAbuseListenerComponent } from './report-abuse-listener.component';

describe('ReportAbuseListenerComponent', () => {
  let component: ReportAbuseListenerComponent;
  let fixture: ComponentFixture<ReportAbuseListenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAbuseListenerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAbuseListenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
