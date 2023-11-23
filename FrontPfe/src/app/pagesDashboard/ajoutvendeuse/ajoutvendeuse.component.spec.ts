import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutvendeuseComponent } from './ajoutvendeuse.component';

describe('AjoutvendeuseComponent', () => {
  let component: AjoutvendeuseComponent;
  let fixture: ComponentFixture<AjoutvendeuseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutvendeuseComponent]
    });
    fixture = TestBed.createComponent(AjoutvendeuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
