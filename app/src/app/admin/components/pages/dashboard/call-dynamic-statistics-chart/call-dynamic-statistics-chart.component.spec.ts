import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallDynamicStatisticsChartComponent } from './call-dynamic-statistics-chart.component';

describe('CallDynamicStatisticsComponent', () => {
  let component: CallDynamicStatisticsChartComponent;
  let fixture: ComponentFixture<CallDynamicStatisticsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallDynamicStatisticsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallDynamicStatisticsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
