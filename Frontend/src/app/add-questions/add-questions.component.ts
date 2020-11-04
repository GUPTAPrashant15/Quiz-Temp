import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { AddQuestionsService } from '../add-questions.service';
import { Question } from '../Question'
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
              private _router: Router,
              public dialog: MatDialog) { }

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
    let ques = this.question_form.value.question_text;
    let o1 = this.question_form.value.option1;
    let o2 = this.question_form.value.option2;
    let o3 = this.question_form.value.option3;
    let o4 = this.question_form.value.option4;
    let c = this.question_form.value.correct;
    let c1 = this.question_form.value.correct1;
    let c2 = this.question_form.value.correct2;
    let c3 = this.question_form.value.correct3;
    let c4 = this.question_form.value.correct4;
    let ta = this.question_form.value.text_answer;
    let ty = this.question_form.value.type;

    let message : string;
    if(ques == "" || ques == null){
      this.dialog.open(AlertDialog, { data : {message : 'Question cannot be empty!'} });
      return;
    }
    if(ty == undefined){
      this.dialog.open(AlertDialog, { data : {message : 'Type cannot be empty!'} });
      return;
    }

    let tempObj = new Question();
    tempObj.quesID = this.questions.length + 1;
    tempObj.question = ques;
    tempObj.quesType = ty;
    tempObj.option1 = o1;
    tempObj.option2 = o2;
    tempObj.option3 = o3;
    tempObj.option4 = o4;

    if(tempObj.quesType != 'Textual'){
      if(o1 == "" || o2 == "" || o3 == "" || o4 == "" || o1 == null || o2 == null || o3 == null || o4 == null){
        this.dialog.open(AlertDialog, { data : {message : 'Options cannot be empty!'} });
        return;
      }

      if(tempObj.quesType == 'Single Correct'){
        if(c == "" || c == null){
          this.dialog.open(AlertDialog, { data : {message : 'Select the correct answer!'} });
          return;
        }
        tempObj.correct = c;
      }
      
      if(tempObj.quesType == 'Multiple Correct'){
        if(c1 == "" && c2 == "" && c3 == "" && c4 == "" || c1 == null && c2 == null && c3 == null && c4 == null){
          this.dialog.open(AlertDialog, { data : {message : 'Select the correct answers!'} });
          return;
        }
        tempObj.correct1 = c1;
        tempObj.correct2 = c2;
        tempObj.correct3 = c3;
        tempObj.correct4 = c4;
      }
    }
    else{
      if(ta == "" || ta == null){
        this.dialog.open(AlertDialog, { data : {message : 'Answer cannot be empty!'} });
        return;
      }
      tempObj.textAnswer = ta;
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


@Component({
  selector: 'alert-dialog',
  templateUrl: 'alert-dialog.html',
})
export class AlertDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) { }
}

