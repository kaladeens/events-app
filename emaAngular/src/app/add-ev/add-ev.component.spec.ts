import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEvComponent } from './add-ev.component';

describe('AddEvComponent', () => {
  let component: AddEvComponent;
  let fixture: ComponentFixture<AddEvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEvComponent]
    });
    fixture = TestBed.createComponent(AddEvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
