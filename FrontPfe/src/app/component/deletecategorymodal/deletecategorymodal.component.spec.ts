import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletecategorymodalComponent } from './deletecategorymodal.component';

describe('DeletecategorymodalComponent', () => {
  let component: DeletecategorymodalComponent;
  let fixture: ComponentFixture<DeletecategorymodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletecategorymodalComponent]
    });
    fixture = TestBed.createComponent(DeletecategorymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
