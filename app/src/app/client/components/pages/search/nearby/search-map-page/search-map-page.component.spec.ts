import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMapPageComponent } from './search-map-page.component';

describe('SearchMapPageComponent', () => {
  let component: SearchMapPageComponent;
  let fixture: ComponentFixture<SearchMapPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMapPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
