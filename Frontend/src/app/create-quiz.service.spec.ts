import { TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CreateQuizService } from './create-quiz.service';
import { Injector } from '@angular/core';

describe('CreateQuizService', () => {
  let service: CreateQuizService;
  let injector: Injector;
  //let httpMock: HttpTestingController;
  let httpMock;

  beforeEach(() => {
    injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CreateQuizService],

    });
    service = injector.get(CreateQuizService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should create', () => {
    fakeAsync(() => {
      expect(service).toBeTruthy();
    });
  });
  afterEach(() => {
    httpMock.verify();
  });

  const dummyQuizListResponse = {
    data: [
      { quizId: 1, quizName: 'Quiz1', username: 'rinkuyadav' },
      { quizId: 2, quizName: 'Quiz2', username: 'rinkuyadav' },
      { quizId: 3, quizName: 'Quiz3', username: 'rinkuyadav' },
    ],
  };
  it('getQuizList() should return data', () => {
    service.getQuiz("rinkuyadav").subscribe((res) => {
      expect(res).toEqual(dummyQuizListResponse);
    });

    const req = httpMock.expectOne(req => req.method === 'GET' && req.url === 'http://localhost:8080/list/rinkuyadav');
    expect(req.request.method).toBe('GET');
    req.flush(dummyQuizListResponse);

  });

  const msg = 'success';
  it('registerQuiz() should POST and return data', () => {
    service.registerQuiz('quiz').subscribe((res) => {
      expect(res).toEqual(msg);
    });

    const req = httpMock.expectOne("http://localhost:8080/addQuiz");
    expect(req.request.method).toBe('POST');
    req.flush(msg);
  });

});
