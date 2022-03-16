import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbuseReportTypeComponent } from './abuse-report-type.component';

describe('AbuseReportTypeComponent', () => {
  let component: AbuseReportTypeComponent;
  let fixture: ComponentFixture<AbuseReportTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbuseReportTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbuseReportTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
