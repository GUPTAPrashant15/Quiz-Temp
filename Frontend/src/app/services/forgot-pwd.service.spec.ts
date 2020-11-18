import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ForgotPwdService } from './forgot-pwd.service';

describe('ForgotPwdService', () => {
  let service: ForgotPwdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
                RouterTestingModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
                FormsModule
              ]
    });
    service = TestBed.inject(ForgotPwdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
