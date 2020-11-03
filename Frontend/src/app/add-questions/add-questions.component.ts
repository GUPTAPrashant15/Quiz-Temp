import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { AddQuestionsService } from '../add-questions.service';
import { Question } from '../Question'

import { ActivatedRoute , Router } from '@angular/router';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {

  'typeValue';

  questions: Question[];

  constructor(private fb: FormBuilder,
    private service:AddQuestionsService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) { }

  question_form = this.fb.group({
    question_text: [''],
    type: [''],
    option1: [''],
    option2: [''],
    option3: [''],
    option4: [''],
    correct: [''],
    correct1: [''],
    correct2: [''],
    correct3: [''],
    correct4: [''],
    text_answer: ['']
  });
  
  message:any;
  quizId:any;

  ngOnInit(): void {
    this.questions = [];
    this._activatedRoute.queryParams.subscribe((param)=>{
     this.quizId=param.quizId;
      console.log(param);
      console.log(this.quizId)
     
    })
  }

  onDelete(q) {
    q.deleted = true;
    this.questions = this.questions.filter(t => t.quesID != q.quesID);
  }

  onSubmit() {
    console.log(this.question_form.value);
    let tempObj = new Question();
    tempObj.quesID = this.questions.length + 1;
    tempObj.question = this.question_form.value.question_text;
    tempObj.quesType = this.question_form.value.type;
    tempObj.option1 = this.question_form.value.option1;
    tempObj.option2 = this.question_form.value.option2;
    tempObj.option3 = this.question_form.value.option3;
    tempObj.option4 = this.question_form.value.option4;
    if(tempObj.quesType != 'Textual'){
      if(tempObj.quesType == 'Single Correct'){
        tempObj.correct = this.question_form.value.correct;
      }
      
      if(tempObj.quesType == 'Multiple Correct'){
        tempObj.correct1 = this.question_form.value.correct1;
        tempObj.correct2 = this.question_form.value.correct2;
        tempObj.correct3 = this.question_form.value.correct3;
        tempObj.correct4 = this.question_form.value.correct4;
      }
    }
    else{
      tempObj.textAnswer = this.question_form.value.text_answer;
    }
    
    this.questions.push(tempObj);
    this.question_form.reset();

  }

  saveQuestions(){
    console.log("-----",this.quizId);
    let resp = this.service.addQuestions(this.questions,this.quizId);
    resp.subscribe((data)=>this.message=data);

    this._router.navigate(['/success']);

  }

}
