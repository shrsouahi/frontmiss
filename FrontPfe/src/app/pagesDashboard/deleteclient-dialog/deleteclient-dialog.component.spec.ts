import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteclientDialogComponent } from './deleteclient-dialog.component';

describe('DeleteclientDialogComponent', () => {
  let component: DeleteclientDialogComponent;
  let fixture: ComponentFixture<DeleteclientDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteclientDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteclientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
