import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordComponent ],
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
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check  password is invalid',()=>{
    let password=component.form.controls['password'];
    expect(password.valid).toBeFalsy();
    expect(password.pristine).toBeTruthy();
    expect(password.errors['required']).toBeTruthy();
  });

  it('should check  password is invalid',()=>{
    let password=component.form.controls['confirm_password'];
    expect(password.valid).toBeFalsy();
    expect(password.pristine).toBeTruthy();
    expect(password.errors['required']).toBeTruthy();
  });

  it('should check correct username is entered',()=>{
    let password=component.form.controls['password'];
    password.setValue('Sopr@_7sopra')
    expect(password.errors).toBeNull();
  });

  it('should give error on empty username',()=>{
    let password=component.form.controls['password'];
    password.setValue('')
    expect(password.valid).toBeFalsy();
  });

  it('should check form is valid or not if no values entered',()=>{
    expect(component.form.valid).toBeFalsy();
  });

  it('form is valid button is enabled',()=>{
    let password=component.form.controls['password'];
    let confirm_password=component.form.controls['confirm_password'];
    password.setValue('Sopr@_7sopra')
    confirm_password.setValue('Sopr@_7sopra')
    fixture.detectChanges();
    let submitEL: DebugElement = fixture.debugElement.query(By.css('#bn'));
    expect(submitEL.nativeElement.disabled).toBe(false);
  });
});

