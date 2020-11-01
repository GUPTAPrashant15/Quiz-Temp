import { TestBed } from '@angular/core/testing';

import { AnlysisResultService } from './anlysis-result.service';

describe('AnlysisResultService', () => {
  let service: AnlysisResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnlysisResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
