import { TestBed } from '@angular/core/testing';

import { SupabaseDefaultService } from './supabase-default.service';

describe('SupabaseDefaultService', () => {
  let service: SupabaseDefaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseDefaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
