import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbuseReportDynamicStatisticChartComponent } from './abuse-report-dynamic-statistic-chart.component';

describe('AbuseReportDynamicStatisticChartComponent', () => {
  let component: AbuseReportDynamicStatisticChartComponent;
  let fixture: ComponentFixture<AbuseReportDynamicStatisticChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbuseReportDynamicStatisticChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbuseReportDynamicStatisticChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
