import { TestBed } from '@angular/core/testing';

import { AddQuestionsService } from './add-questions.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule} from '@angular/common/http';

describe('AddQuestionsService', () => {
  let service: AddQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      HttpClientTestingModule, 
      HttpClientModule,
    ]});
    service = TestBed.inject(AddQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
