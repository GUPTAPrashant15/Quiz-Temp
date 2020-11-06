import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';

describe('RegistrationComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [        
        RouterModule.forRoot([]),
        HttpClientTestingModule,
    ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check  email is invalid',()=>{
    let email=component.loginForm.controls['username'];
    expect(email.valid).toBeFalsy();
    expect(email.pristine).toBeTruthy();
    expect(email.errors['required']).toBeTruthy();
    email.setValue('abc');
    expect(email.errors['pattern']).toBeTruthy()
  });

  it('should check correct email is entered',()=>{
    let email=component.loginForm.controls['username'];
    email.setValue('abc@gmail.com')
    expect(email.errors).toBeNull();
  });

  it('should give error on empty email',()=>{
    let email=component.loginForm.controls['username'];
    email.setValue('')
    expect(email.valid).toBeFalsy();
  });

  

it('should give error on empty Password',()=>{
  let password=component.loginForm.controls['password'];
  password.setValue('')
  expect(password.valid).toBeFalsy();
});

it('should check password is valid',()=>{
  let password=component.loginForm.controls['password'];
 password.setValue("Hritik&1234");
 expect(password.errors).toBeNull();
});

it('should check Password is invalid',()=>{
  let password=component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();
    expect(password.pristine).toBeTruthy();
    expect(password.errors['required']).toBeTruthy();
    password.setValue('abcdef');
    expect(password.errors['pattern']).toBeTruthy();
    expect(password.errors['minlength']).toBeTruthy();   
});

it('should check registration form is valid or not if no values entered',()=>{
  expect(component.loginForm.valid).toBeFalsy();
});

it('should check registration form is valid or not when values are entered',()=>{
  component.loginForm.controls['username'].setValue('hritik.tiwari@soprabanking.com')
  component.loginForm.controls['password'].setValue("Hritik&1234");
  expect(component.loginForm.valid).toBeTruthy();
});

it('should be 2 button', ()=>{
    const divcount = fixture.debugElement
    .queryAll(By.css('button'));
    expect(divcount.length).toBe(2); 
    });
});
