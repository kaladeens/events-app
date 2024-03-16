import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelEvComponent } from './del-ev.component';

describe('DelEvComponent', () => {
  let component: DelEvComponent;
  let fixture: ComponentFixture<DelEvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DelEvComponent]
    });
    fixture = TestBed.createComponent(DelEvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
