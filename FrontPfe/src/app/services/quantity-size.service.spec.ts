import { TestBed } from '@angular/core/testing';

import { QuantitySizeService } from './quantity-size.service';

describe('QuantitySizeService', () => {
  let service: QuantitySizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuantitySizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
