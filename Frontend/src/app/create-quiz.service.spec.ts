import { TestBed } from '@angular/core/testing';

import { CreateQuizService } from './create-quiz.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule} from '@angular/common/http';

describe('CreateQuizService', () => {
  let service: CreateQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CreateQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
