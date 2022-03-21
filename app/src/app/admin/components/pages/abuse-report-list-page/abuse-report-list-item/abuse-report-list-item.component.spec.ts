import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbuseReportListItemComponent } from './abuse-report-list-item.component';

describe('AbuseReportListItemComponent', () => {
  let component: AbuseReportListItemComponent;
  let fixture: ComponentFixture<AbuseReportListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbuseReportListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbuseReportListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
