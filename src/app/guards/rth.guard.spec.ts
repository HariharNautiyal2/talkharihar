import { TestBed } from '@angular/core/testing';

import { RthGuard } from './rth.guard';

describe('RthGuard', () => {
  let guard: RthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
