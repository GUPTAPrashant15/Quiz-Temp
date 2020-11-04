import { TestBed } from '@angular/core/testing';

import { AnlysisResultService } from './anlysis-result.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule} from '@angular/common/http';

describe('AnlysisResultService', () => {
  let service: AnlysisResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule
      ]
    });
    service = TestBed.inject(AnlysisResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
