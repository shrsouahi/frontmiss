import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutClienteComponent } from './ajout-cliente.component';

describe('AjoutClienteComponent', () => {
  let component: AjoutClienteComponent;
  let fixture: ComponentFixture<AjoutClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutClienteComponent]
    });
    fixture = TestBed.createComponent(AjoutClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
