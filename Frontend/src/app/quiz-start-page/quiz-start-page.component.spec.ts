import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { QuizStartPageComponent } from './quiz-start-page.component';

describe('QuizStartPageComponent', () => {
  let component: QuizStartPageComponent;
  let fixture: ComponentFixture<QuizStartPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizStartPageComponent ],
      imports: [        
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        ReactiveFormsModule,
          
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizStartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check  username is invalid',()=>{
    let username=component.form.controls['username'];
    expect(username.valid).toBeFalsy();
    expect(username.pristine).toBeTruthy();
    expect(username.errors['required']).toBeTruthy();
    username.setValue('abc');
    expect(username.errors['pattern']).toBeTruthy()
  });

  it('should check correct username is entered',()=>{
    let username=component.form.controls['username'];
    username.setValue('shivam123')
    expect(username.errors).toBeNull();
  });

  it('should give error on empty username',()=>{
    let username=component.form.controls['username'];
    username.setValue('')
    expect(username.valid).toBeFalsy();
  });

  it('should check form is valid or not if no values entered',()=>{
    expect(component.form.valid).toBeFalsy();
  });
  
  it('should check form is valid or not when values are entered',()=>{
    component.form.controls['username'].setValue('shivam123')
    expect(component.form.valid).toBeTruthy();
  });

  it('should be 1 button', ()=>{
    const divcount = fixture.debugElement
    .queryAll(By.css('button'));
    expect(divcount.length).toBe(1); 
    });

  it('form is invalid button is disable',()=>{
    let submitEL: DebugElement = fixture.debugElement.query(By.css('#bn'));
    expect(submitEL.nativeElement.disabled).toBe(true);
  });

  it('form is valid button is enabled',()=>{
    let username=component.form.controls['username'];
    username.setValue('shivam123')
    fixture.detectChanges();
    let submitEL: DebugElement = fixture.debugElement.query(By.css('#bn'));
    expect(submitEL.nativeElement.disabled).toBe(false);
  });

  it('check h1 tag content',()=>{
    let h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toEqual('Welcome to SBSI Quiz Portal');
  });

  

  it('should create a FormGroup comprised of FormControls', () => {
    component.ngOnInit();
    expect(component.form instanceof FormGroup).toBe(true);
});


it(`should submit  form `, () => {
  spyOn(component, 'userForm' );

  component.form.controls['username'].setValue('shivam123');
  fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);     
  fixture.detectChanges();

  expect(component.userForm).toHaveBeenCalled();
});

it('should have a working userInformation function', () => {
  let userInformation=null;
  component.userForm(userInformation);
  fixture.detectChanges();
  expect(component.front).toBe(true);
  
});








it('username should be undefined when component load', () => {
  expect(component.username).toBe(undefined);
  expect(component.q.quizId).toBe(undefined);
});

it('should have onDelete function', () => {
    let quizId = 12;
    // expect(component.onDelete(q)).toBeTruthy();
    component.loadQuiz(quizId);
    fixture.detectChanges();
    expect(component.loadQuiz).toHaveBeenCalled;
  
  });

  


});
