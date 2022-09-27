import { TestBed } from '@angular/core/testing';

import { SymblService } from './symbl.service';

describe('SymblService', () => {
  let service: SymblService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SymblService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
