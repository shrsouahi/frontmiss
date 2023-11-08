import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdresseModalComponent } from './edit-adresse-modal.component';

describe('EditAdresseModalComponent', () => {
  let component: EditAdresseModalComponent;
  let fixture: ComponentFixture<EditAdresseModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAdresseModalComponent]
    });
    fixture = TestBed.createComponent(EditAdresseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
