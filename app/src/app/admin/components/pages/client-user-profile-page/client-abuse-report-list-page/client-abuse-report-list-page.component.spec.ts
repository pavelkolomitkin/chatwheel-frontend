import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAbuseReportListPageComponent } from './client-abuse-report-list-page.component';

describe('ClientAbuseReportListPageComponent', () => {
  let component: ClientAbuseReportListPageComponent;
  let fixture: ComponentFixture<ClientAbuseReportListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAbuseReportListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAbuseReportListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
