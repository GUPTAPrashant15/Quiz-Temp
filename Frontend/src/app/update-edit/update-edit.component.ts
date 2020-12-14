import { Component, OnInit , Inject} from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Question } from '../Question'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateQuizService } from "src/app/create-quiz.service";
import { Location } from '@angular/common';
import { coerceArray } from '@angular/cdk/coercion';
// import { type } from 'os';
@Component({
  selector: 'app-update-edit',
  templateUrl: './update-edit.component.html',
  styleUrls: ['./update-edit.component.css']
})
export class UpdateEditComponent implements OnInit {

 
  correct : String= '3';
  typeValue: any;

  /**
   * question is a variable of type Question
   * 
   * @see src/app/Question
   */
  questions: Question;

  constructor(private fb: FormBuilder,
    private service: CreateQuizService,
    private location: Location,
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
    correct: [ ],
    correct1: [''],
    correct2: [''],
    correct3: [''],
    correct4: [''],
    text_answer: ['']
  });
  /**
   * @ignore
   */
  message: any;
  /**
   * @ignore
   */
  qu_Id: any;
  quizId: any;
  questiontype: any;
  quiz_ques_id : any;
  ngOnInit(): void {
    let quizid = parseInt(this._activatedRoute.snapshot.paramMap.get('quizId'));
    var qId = quizid.toString();
    console.log(qId)

    let quesid = parseInt(this._activatedRoute.snapshot.paramMap.get('quesId'));
    var questionNo = quesid.toString();
    console.log(questionNo)

    var sep = "_";
    var str3 = qId.concat(sep.toString());
    this.quiz_ques_id = str3.concat(questionNo);


     this.service.getQuestion(this.quiz_ques_id).subscribe(data => {
      this.typeValue=data['quesType']
      this.qu_Id = data['quesId']
      this.correct=data['correct']
       this.question_form = new FormGroup({
         question_text : new FormControl(data['question']),
          type : new FormControl(data['quesType']),
          option1: new FormControl(data['option1']),
          option2: new FormControl(data['option2']),
          option3: new FormControl(data['option3']),
          option4: new FormControl(data['option4']),
          correct: new FormControl(data['correct']),
          correct1 : new FormControl(data['correct1']),
          correct2 : new FormControl(data['correct2']),
          correct3 : new FormControl(data['correct3']),
          correct4 : new FormControl(data['correct4']),
          text_answer: new FormControl(data['textAnswer'])
       })
      
     });
     
  }

  onSubmit() {
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
    let q_No = this.qu_Id;
    let message: string;
    if (ques == "" || ques == null) {
      this.dialog.open(AlertDialog, { data: { message: 'Question cannot be empty!' } });
      return;
    }
    if (ty == undefined) {
      this.dialog.open(AlertDialog, { data: { message: 'Type cannot be empty!' } });
      return;
    }

    let tempObj = new Question();
    tempObj.quesID = q_No;
    tempObj.question = ques;
    tempObj.quesType = ty;
    tempObj.option1 = o1;
    tempObj.option2 = o2;
    tempObj.option3 = o3;
    tempObj.option4 = o4;

    if (tempObj.quesType != 'Textual') {
      if (o1 == "" || o2 == "" || o3 == "" || o4 == "" || o1 == null || o2 == null || o3 == null || o4 == null) {
        this.dialog.open(AlertDialog, { data: { message: 'Options cannot be empty!' } });
        return;
      }

      if (tempObj.quesType == 'Single Correct') {
        if (c == "" || c == null) {
          this.dialog.open(AlertDialog, { data: { message: 'Select the correct answer!' } });
          return;
        }
        tempObj.correct = c;
      }

      if (tempObj.quesType == 'Multiple Correct') {
        if (c1 == "" && c2 == "" && c3 == "" && c4 == "" || c1 == null && c2 == null && c3 == null && c4 == null) {
          this.dialog.open(AlertDialog, { data: { message: 'Select the correct answers!' } });
          return;
        }
        if (c1 == null || c1 == "") {
          tempObj.correct1 = null;
        }
        if (c2 == null || c2 == "") {
          tempObj.correct2 = null;
        }
        if (c3 == null || c3 == "") {
          tempObj.correct3 = null;
        }
        if (c4 == null || c4 == "") {
          tempObj.correct4 = null;
        }

        tempObj.correct1 = c1;
        tempObj.correct2 = c2;
        tempObj.correct3 = c3;
        tempObj.correct4 = c4;
      }
    }
    else {
      if (ta == "" || ta == null) {
        this.dialog.open(AlertDialog, { data: { message: 'Answer cannot be empty!' } });
        return;
      }
      tempObj.textAnswer = ta;
    }

    this.questions = tempObj;
    let resp = this.service.updateQuestion(this.questions, this.quiz_ques_id);
    resp.subscribe((data) => this.message = data);
    this.location.back();
  }
}

export class AlertDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) { }
}

