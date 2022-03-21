import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientReportAbuseItemComponent } from './client-report-abuse-item.component';

describe('ClientReportAbuseItemComponent', () => {
  let component: ClientReportAbuseItemComponent;
  let fixture: ComponentFixture<ClientReportAbuseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientReportAbuseItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientReportAbuseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
