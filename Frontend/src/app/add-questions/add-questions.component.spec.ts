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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have onDelete function', () => {
    let q = new Question;
    // expect(component.onDelete(q)).toBeTruthy();
    let len = component.questions.length;
    // component.question_form.value.text_answer;
    component.onDelete(q);
    fixture.detectChanges();
    expect(component.questions.length).toBe(len - 1);
    len = len - 1;
  });

  it('should have a working onSubmit function', () => {
    component.question_form.value.question_text = "hello";
    component.question_form.value.type = "Multiple Correct";
    component.question_form.value.option1 = "a";
    component.question_form.value.option2 = "b";
    component.question_form.value.option3 = "c";
    component.question_form.value.option4 = "d";
    // component.question_form.value.correct = "2";
    component.question_form.value.correct1 = true;
    component.question_form.value.correct2 = true;
    component.question_form.value.correct3;
    component.question_form.value.correct4;
    let len = component.questions.length;
    // component.question_form.value.text_answer;
    component.onSubmit();
    fixture.detectChanges();
    expect(component.questions.length).toBe(len + 1);
    len = len + 1;
  });

  it('should have saveQuestions function', () => {
    let q = new Question;
    component.questions.push(q);
    expect(component.saveQuestions()).toBeTruthy();
  });

  
});
