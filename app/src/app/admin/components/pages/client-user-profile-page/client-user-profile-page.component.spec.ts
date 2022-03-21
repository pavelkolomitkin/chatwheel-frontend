import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientUserProfilePageComponent } from './client-user-profile-page.component';

describe('ClientUserProfilePageComponent', () => {
  let component: ClientUserProfilePageComponent;
  let fixture: ComponentFixture<ClientUserProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientUserProfilePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientUserProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
