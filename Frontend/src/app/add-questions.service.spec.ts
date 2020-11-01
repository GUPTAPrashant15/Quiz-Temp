import { TestBed } from '@angular/core/testing';

import { AddQuestionsService } from './add-questions.service';

describe('AddQuestionsService', () => {
  let service: AddQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
