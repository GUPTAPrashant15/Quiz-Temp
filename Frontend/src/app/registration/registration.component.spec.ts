import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      imports: [        
        RouterModule.forRoot([]),
        HttpClientTestingModule,
    ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check  email is invalid',()=>{
    let email=component.form.controls['emailId'];
    expect(email.valid).toBeFalsy();
    expect(email.pristine).toBeTruthy();
    expect(email.errors['required']).toBeTruthy();
    email.setValue('abc');
    expect(email.errors['pattern']).toBeTruthy()
  });

  it('should check correct email is entered',()=>{
    let email=component.form.controls['emailId'];
    email.setValue('abc@gmail.com')
    expect(email.errors).toBeNull();
  });

  it('should give error on empty email',()=>{
    let email=component.form.controls['emailId'];
    email.setValue('')
    expect(email.valid).toBeFalsy();
  });

   it('should give error on empty first name',()=>{
     let firstName=component.form.controls['firstName'];
     firstName.setValue('')
     expect(firstName.valid).toBeFalsy();
 });

 it('should check firstname is invalid',()=>{
  let firstName=component.form.controls['firstName'];
  expect(firstName.pristine).toBeTruthy();
  expect(firstName.errors['required']).toBeTruthy();

});

it('should give error on empty lastname',()=>{
 let lastName=component.form.controls['lastName'];
 lastName.setValue('')
 expect(lastName.valid).toBeFalsy();
});

it('should check lastname is invalid',()=>{
 let lastName=component.form.controls['lastName'];
 expect(lastName.pristine).toBeTruthy();
 expect(lastName.errors['required']).toBeTruthy();
});

it('should check phone number is invalid',()=>{
 let number=component.form.controls['number'];
 expect(number.valid).toBeFalsy();
 expect(number.pristine).toBeTruthy();
 expect(number.errors['required']).toBeTruthy();
 number.setValue('1223455');
 expect(number.errors['minlength']).toBeTruthy();
 
});
it('should give error on empty phone number',()=>{
 let number=component.form.controls['number'];
 number.setValue('')
 expect(number.valid).toBeFalsy();
});

it('should check correct phone number is valid',()=>{
  let number=component.form.controls['number'];
  number.setValue('9411009009')
  expect(number.errors).toBeNull();
});

it('should give error on empty Password',()=>{
  let password=component.form.controls['password'];
  password.setValue('')
  expect(password.valid).toBeFalsy();
});

it('should check password is valid',()=>{
  let password=component.form.controls['password'];
 password.setValue("Hritik&1234");
 expect(password.errors).toBeNull();
});

it('should check Password is invalid',()=>{
  let password=component.form.controls['password'];
    expect(password.valid).toBeFalsy();
    expect(password.pristine).toBeTruthy();
    expect(password.errors['required']).toBeTruthy();
    password.setValue('abcdef');
    expect(password.errors['pattern']).toBeTruthy();
    expect(password.errors['minlength']).toBeTruthy();   
});

it('should check registration form is valid or not if no values entered',()=>{
  expect(component.form.valid).toBeFalsy();
});

it('should check registration form is valid or not when values are entered',()=>{
  component.form.controls['firstName'].setValue('Hritik');
  component.form.controls['lastName'].setValue('Tiwari');
  component.form.controls['emailId'].setValue('hritik.tiwari@soprabanking.com')
  component.form.controls['number'].setValue('9027797072');
  component.form.controls['password'].setValue("Hritik&1234");
  expect(component.form.valid).toBeTruthy();
});
});
