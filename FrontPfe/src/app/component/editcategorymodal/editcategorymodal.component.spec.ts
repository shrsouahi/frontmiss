import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcategorymodalComponent } from './editcategorymodal.component';

describe('EditcategorymodalComponent', () => {
  let component: EditcategorymodalComponent;
  let fixture: ComponentFixture<EditcategorymodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditcategorymodalComponent]
    });
    fixture = TestBed.createComponent(EditcategorymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
