import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSoldEvComponent } from './list-sold-ev.component';

describe('ListSoldEvComponent', () => {
  let component: ListSoldEvComponent;
  let fixture: ComponentFixture<ListSoldEvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSoldEvComponent]
    });
    fixture = TestBed.createComponent(ListSoldEvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
