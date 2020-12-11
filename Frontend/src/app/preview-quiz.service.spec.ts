import { TestBed } from '@angular/core/testing';

import { PreviewQuizService } from './preview-quiz.service';

describe('PreviewQuizService', () => {
  let service: PreviewQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviewQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
