import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientUserFractionsChartComponent } from './client-user-fractions-chart.component';

describe('ClientUserFractionsChartComponent', () => {
  let component: ClientUserFractionsChartComponent;
  let fixture: ComponentFixture<ClientUserFractionsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientUserFractionsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientUserFractionsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
