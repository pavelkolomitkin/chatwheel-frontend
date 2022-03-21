import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbuseReportListPageComponent } from './abuse-report-list-page.component';

describe('AbuseReportListPageComponent', () => {
  let component: AbuseReportListPageComponent;
  let fixture: ComponentFixture<AbuseReportListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbuseReportListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbuseReportListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
