import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientUserDynamicStatisticsChartComponent } from './client-user-dynamic-statistics-chart.component';

describe('ClientUserDynamicStatisticsChartComponent', () => {
  let component: ClientUserDynamicStatisticsChartComponent;
  let fixture: ComponentFixture<ClientUserDynamicStatisticsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientUserDynamicStatisticsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientUserDynamicStatisticsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
