import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbuseReportListFilterFormComponent } from './abuse-report-list-filter-form.component';

describe('AbuseReportListFilterFormComponent', () => {
  let component: AbuseReportListFilterFormComponent;
  let fixture: ComponentFixture<AbuseReportListFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbuseReportListFilterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbuseReportListFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
