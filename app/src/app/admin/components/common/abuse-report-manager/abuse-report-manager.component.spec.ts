import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbuseReportManagerComponent } from './abuse-report-manager.component';

describe('AbuseReportManagerComponent', () => {
  let component: AbuseReportManagerComponent;
  let fixture: ComponentFixture<AbuseReportManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbuseReportManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbuseReportManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
