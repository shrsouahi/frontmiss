import { TestBed } from '@angular/core/testing';

import { QuantityOrderService } from './quantity-order.service';

describe('QuantityOrderService', () => {
  let service: QuantityOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuantityOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
