import { EmailDetail } from './email-detail';

describe('EmailDetail', () => {
  let obj=new EmailDetail();
  obj.emailId="agarwal.shivam645@gmail.com";
  
  it('should create an instance', () => {
    expect(new EmailDetail()).toBeTruthy();
  });

  it('should create an instance', () => {
    expect(obj.emailId).toBeTruthy();
  });

  it('should create an instance', () => {
    expect(obj.emailId).toBeDefined();
  });
  

});
