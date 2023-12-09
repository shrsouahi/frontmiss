import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetoursComponent } from './retours.component';

describe('RetoursComponent', () => {
  let component: RetoursComponent;
  let fixture: ComponentFixture<RetoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetoursComponent]
    });
    fixture = TestBed.createComponent(RetoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
