import { TestBed } from '@angular/core/testing';

import { BlogInfoService } from './blog-info.service';

describe('BlogInfoService', () => {
  let service: BlogInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
