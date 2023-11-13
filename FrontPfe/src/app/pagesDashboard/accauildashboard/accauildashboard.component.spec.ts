import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccauildashboardComponent } from './accauildashboard.component';

describe('AccauildashboardComponent', () => {
  let component: AccauildashboardComponent;
  let fixture: ComponentFixture<AccauildashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccauildashboardComponent]
    });
    fixture = TestBed.createComponent(AccauildashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
