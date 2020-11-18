import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
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
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make the form invalid is empty',()=>{	
        expect(component.form.valid).toBeFalsy();	
      });

  it('should give error on incorrect email',()=>{	
    let email=component.form.controls['email'];	
    email.setValue('shivam')	
    expect(component.form.valid).toBeFalsy();	
  });

  it('should give error on empty email',()=>{	
    let email=component.form.controls['email'];	
    email.setValue('')	
    expect(email.valid).toBeFalsy();
  });


 
    
      it(`should submit  form `, () => {
            spyOn(component, 'EmailForm' );	
            component.form.controls['email'].setValue('test@test.com');	
            fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);    	
            fixture.detectChanges();
            expect(component.EmailForm).toHaveBeenCalled();
        });
        it(`should submit form`, () => {
          spyOn(component, 'EmailForm' );
          component.form.controls['email'].setValue('test@test.com');
          fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);    	
          fixture.detectChanges();
          expect(component.EmailForm).toHaveBeenCalled();
        });
        it(`should submit form`, () => {
          spyOn(console, 'log');
          component.form.controls['email'].setValue('test@test.com');
          fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);    
          fixture.detectChanges();
          expect(console.log).toHaveBeenCalledTimes(0);
        });
        
});
