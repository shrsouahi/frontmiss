import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcategorymodalComponent } from './addcategorymodal.component';

describe('AddcategorymodalComponent', () => {
  let component: AddcategorymodalComponent;
  let fixture: ComponentFixture<AddcategorymodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddcategorymodalComponent]
    });
    fixture = TestBed.createComponent(AddcategorymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
