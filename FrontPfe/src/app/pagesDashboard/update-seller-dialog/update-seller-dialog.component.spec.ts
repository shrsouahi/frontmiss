import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSellerDialogComponent } from './update-seller-dialog.component';

describe('UpdateSellerDialogComponent', () => {
  let component: UpdateSellerDialogComponent;
  let fixture: ComponentFixture<UpdateSellerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSellerDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateSellerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
