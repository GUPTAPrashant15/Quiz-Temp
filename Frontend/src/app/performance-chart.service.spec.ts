import { TestBed } from '@angular/core/testing';

import { PerformanceChartService } from './performance-chart.service';

describe('PerformanceChartService', () => {
  let service: PerformanceChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerformanceChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
