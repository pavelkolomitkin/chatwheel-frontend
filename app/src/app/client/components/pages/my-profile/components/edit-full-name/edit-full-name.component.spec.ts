import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFullNameComponent } from './edit-full-name.component';

describe('EditFullNameComponent', () => {
  let component: EditFullNameComponent;
  let fixture: ComponentFixture<EditFullNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFullNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFullNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
