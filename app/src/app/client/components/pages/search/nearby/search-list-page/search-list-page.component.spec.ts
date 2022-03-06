import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListPageComponent } from './search-list-page.component';

describe('SearchListPageComponent', () => {
  let component: SearchListPageComponent;
  let fixture: ComponentFixture<SearchListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
