import { OtpDetail } from './otp-detail';

describe('OtpDetail', () => {
  let obj=new OtpDetail();
  obj.emailId="agarwal.shivam645@gmail.com";
  obj.otp='123456';
  it('should create an instance', () => {
    expect(new OtpDetail()).toBeTruthy();
  });

  it('should create an instance', () => {
    expect(obj.emailId).toBeTruthy();
  });

  it('should create an instance', () => {
    expect(obj.emailId).toBeDefined();
  });
  it('should create an instance', () => {
    expect(obj.otp).toBeTruthy();
  });

  it('should create an instance', () => {
    expect(obj.otp).toBeDefined();
  });
  
});
