import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockAdminManagerComponent } from './block-admin-manager.component';

describe('BlockAdminManagerComponent', () => {
  let component: BlockAdminManagerComponent;
  let fixture: ComponentFixture<BlockAdminManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockAdminManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockAdminManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
