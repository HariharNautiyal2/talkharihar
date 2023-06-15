import { TestBed } from '@angular/core/testing';

import { RtlGuard } from './rtl.guard';

describe('RtlGuard', () => {
  let guard: RtlGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RtlGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
