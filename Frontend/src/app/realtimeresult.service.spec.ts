import { TestBed,fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injector } from '@angular/core';


import { RealtimeresultService } from './realtimeresult.service';

describe('RealtimeresultService', () => {
  let service: RealtimeresultService;
  let injector:Injector;
  let httpMock;

  beforeEach(() => {
   injector=  TestBed.configureTestingModule({
     imports: [HttpClientTestingModule],
      providers: [RealtimeresultService],


   });
    service = TestBed.inject(RealtimeresultService);
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
});
