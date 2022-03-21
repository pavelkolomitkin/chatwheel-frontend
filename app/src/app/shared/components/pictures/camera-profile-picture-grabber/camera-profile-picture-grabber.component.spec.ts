import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraProfilePictureGrabberComponent } from './camera-profile-picture-grabber.component';

describe('CameraProfilePictureGrabberComponent', () => {
  let component: CameraProfilePictureGrabberComponent;
  let fixture: ComponentFixture<CameraProfilePictureGrabberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraProfilePictureGrabberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraProfilePictureGrabberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
