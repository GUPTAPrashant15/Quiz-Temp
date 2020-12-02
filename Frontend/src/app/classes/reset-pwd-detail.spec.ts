import { ResetPwdDetail } from './reset-pwd-detail';

describe('ResetPwdDetail', () => {
  let obj=new ResetPwdDetail();
  obj.emailId="agarwal.shivam645@gmail.com";
  obj.password='Sopr@_7sopra';
  it('should create an instance', () => {
    expect(new ResetPwdDetail()).toBeTruthy();
  });

  it('should create an instance', () => {
    expect(obj.emailId).toBeTruthy();
  });

  it('should create an instance', () => {
    expect(obj.emailId).toBeDefined();
  });
  it('should create an instance', () => {
    expect(obj.password).toBeTruthy();
  });

  it('should create an instance', () => {
    expect(obj.password).toBeDefined();
  });
  
});
