import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAbuseButtonsComponent } from './report-abuse-buttons.component';

describe('ReportAbuseButtonsComponent', () => {
  let component: ReportAbuseButtonsComponent;
  let fixture: ComponentFixture<ReportAbuseButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAbuseButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAbuseButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
