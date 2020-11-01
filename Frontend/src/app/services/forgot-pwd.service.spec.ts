import { TestBed } from '@angular/core/testing';

import { ForgotPwdService } from './forgot-pwd.service';

describe('ForgotPwdService', () => {
  let service: ForgotPwdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotPwdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
