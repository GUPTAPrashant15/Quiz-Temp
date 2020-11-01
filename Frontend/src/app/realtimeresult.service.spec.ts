import { TestBed } from '@angular/core/testing';

import { RealtimeresultService } from './realtimeresult.service';

describe('RealtimeresultService', () => {
  let service: RealtimeresultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealtimeresultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
