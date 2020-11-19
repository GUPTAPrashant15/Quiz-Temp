import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { OtpVerificationComponent } from './otp-verification.component';

describe('OtpVerificationComponent', () => {
  var originalTimeout;

  let component: OtpVerificationComponent;
  let fixture: ComponentFixture<OtpVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpVerificationComponent ],
      imports:[
                RouterTestingModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
                FormsModule
              ],
    })
    .compileComponents();
  });

  beforeEach(() => {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
    window.history.pushState({ email: 'agarwal.shivam645@gmail.com'},'','/otp-verify');
    fixture = TestBed.createComponent(OtpVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });
  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should create', () => {
    
    expect(component).toBeTruthy();
  });

  it('should have onDelete function', () => {
    var dummyElement = document.createElement('logout');
    document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
    fixture.detectChanges();
    expect(document.getElementById).toBeTruthy;
  
  });

  it('should', async(() => {
    spyOn(component, 'onCancel');
  
    let button = fixture.debugElement.nativeElement.querySelector('#bn');
    button.click();
  
    fixture.whenStable().then(() => {
      expect(component.onCancel).toHaveBeenCalled();
    });
  }));

  
});
