import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuantitiesComponent } from './edit-quantities.component';

describe('EditQuantitiesComponent', () => {
  let component: EditQuantitiesComponent;
  let fixture: ComponentFixture<EditQuantitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditQuantitiesComponent]
    });
    fixture = TestBed.createComponent(EditQuantitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
