import { TestBed, async, inject } from '@angular/core/testing';

import { UserChildGuard } from './user-child.guard';

describe('UserChildGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserChildGuard]
    });
  });

  it('should ...', inject([UserChildGuard], (guard: UserChildGuard) => {
    expect(guard).toBeTruthy();
  }));
});
