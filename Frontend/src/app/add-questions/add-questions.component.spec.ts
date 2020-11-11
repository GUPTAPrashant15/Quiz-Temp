import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionsComponent } from './add-questions.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {MatDialogModule} from '@angular/material/dialog'; 
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select'; 
import {MatInputModule} from '@angular/material/input'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Question } from '../Question'
import { By } from '@angular/platform-browser'

describe('AddQuestionsComponent', () => {
  let component: AddQuestionsComponent;
  let fixture: ComponentFixture<AddQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        ReactiveFormsModule,
        HttpClientTestingModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        MatDialogModule,
        MatRadioModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [ AddQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.question_form.value.question_text = "hello";
    component.question_form.value.option1 = "a";
    component.question_form.value.option2 = "b";
    component.question_form.value.option3 = "c";
    component.question_form.value.option4 = "d";
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have onDelete function', () => {
    let q = new Question;
    // expect(component.onDelete(q)).toBeTruthy();
    component.questions.push(q);

    let len = component.questions.length;
    // component.question_form.value.text_answer;
    component.onDelete(q);
    fixture.detectChanges();
    expect(component.questions.length).toBe(len - 1);
    len = len - 1;
  });

  it('should have a working onSubmit function: Multiple', () => {
    let len = component.questions.length;
    component.question_form.value.type = "Multiple Correct";
    // component.question_form.value.text_answer;
    component.question_form.value.correct1 = true;
    component.question_form.value.correct2 = true;
    component.question_form.value.correct3;
    component.question_form.value.correct4;
    component.onSubmit();
    fixture.detectChanges();
    expect(component.questions.length).toBe(len + 1);
    len = len + 1;
  });

  it('should have a working onSubmit function: Single', () => {
    let len = component.questions.length;
    component.question_form.value.type = "Single Correct";
    component.question_form.value.correct = "1";
    component.onSubmit();
    fixture.detectChanges();
    expect(component.questions.length).toBe(len + 1);
    len = len + 1;
  });

  it('should have Create Quiz Button', () => {
    let q = new Question;
    component.questions.push(q);
    // component.saveQuestions();
    // fixture.detectChanges();
    let shareButton = fixture.debugElement.query(By.css('#create')).nativeElement;
    expect(shareButton.textContent).toBe("Create Quiz");
  });

  
});
