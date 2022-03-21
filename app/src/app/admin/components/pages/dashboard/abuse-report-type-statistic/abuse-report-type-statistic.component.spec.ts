import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbuseReportTypeStatisticComponent } from './abuse-report-type-statistic.component';

describe('AbuseReportTypeStatisticComponent', () => {
  let component: AbuseReportTypeStatisticComponent;
  let fixture: ComponentFixture<AbuseReportTypeStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbuseReportTypeStatisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbuseReportTypeStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
