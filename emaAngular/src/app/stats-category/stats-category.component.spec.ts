import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsCategoryComponent } from './stats-category.component';

describe('StatsCategoryComponent', () => {
  let component: StatsCategoryComponent;
  let fixture: ComponentFixture<StatsCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsCategoryComponent]
    });
    fixture = TestBed.createComponent(StatsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
