import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { AddQuestionsService } from '../add-questions.service';
import { Question } from '../Question'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ActivatedRoute, Router } from '@angular/router';
import { ImplicitReceiver } from '@angular/compiler';
/** 
 * This component enables the user to go on the add question page, where user can add questions of single correct , multiple correct type ,and textual type question.
 */
@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {

  'typeValue';

  /**
   * question is a variable of type Question
   * 
   * @see src/app/Question
   */
  questions: Question[];

  constructor(private fb: FormBuilder,
    private service: AddQuestionsService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public dialog: MatDialog) { }

  question_form = this.fb.group({
    question_text: [''],
    ques_Image: [''],
    type: [''],
    option1: [''],
    option2: [''],
    option3: [''],
    option4: [''],
    option1_Image: [''],
    option2_Image: [''],
    option3_Image: [''],
    option4_Image: [''],
    correct: [''],
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
  quizId: any;

  /**
   *  It takes quiz id from URL and initializes it in quizId variable.
   */
  ngOnInit(): void {
    this.questions = [];
    this._activatedRoute.queryParams.subscribe((param) => {
      this.quizId = param.quizId;
    })
  }

  // selectedFile: File = null ; 
  // retrievedImage: any;
  // base64Data: any;

  // public imagePath;
  // imgURL: any;
  option1URL: any;
  option2URL: any;
  option3URL: any;
  option4URL: any;

  // event1 : any;

  onFileSelected(event){
    //this.event = event1;
    //this.event1 = event;
    console.log(event);
    // this.selectedFile = <File>event.target.files[0];
    var reader = new FileReader();
    // this.imagePath = event.target.files;
    if(event.target.files[0]){
      reader.readAsDataURL(event.target.files[0]);
    }
    //reader.readAsDataURL(event.target.files[0]); 
    //reader.readAsDataURL(this.event1.target.files[0]); 
    reader.onload = (_event) => { 
      // this.imgURL = reader.result; 
      this.question_form.patchValue({
        // ques_Image : this.imgURL
        ques_Image : reader.result
      });
    }
  }

  onOption1FileSelected(event){
    var reader = new FileReader();
    if(event.target.files[0]){
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (_event) => {
      this.option1URL = reader.result;
      this.question_form.patchValue({
        option1_Image : this.option1URL 
      });
    }
  }

  onOption2FileSelected(event){
    var reader = new FileReader();
    if(event.target.files[0]){
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (_event) => {
      this.option2URL = reader.result;
      this.question_form.patchValue({
        option2_Image : this.option2URL 
      });
    }
  } 

  onOption3FileSelected(event){
    var reader = new FileReader();
    if(event.target.files[0]){
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (_event) => {
      this.option3URL = reader.result;
      this.question_form.patchValue({
        option3_Image : this.option3URL 
      });
    }
  }

  onOption4FileSelected(event){
    var reader = new FileReader();
    if(event.target.files[0]){
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (_event) => {
      this.option4URL = reader.result;
      this.question_form.patchValue({
        option4_Image : this.option4URL 
      });
    }
  }
/**
 * This method deletes the selected question.
 * This method will call when user clicking on delete icon in Added Question .
 * @param q is a object of Question type.
 * 
 */
  onDelete(q) {
    this.questions = this.questions.filter(t => t.quesID != q.quesID);
  }

  /**
   * This method is used to save the question in a list of type Question.
   * It checks question is either a single type or multiple choice or textual type and saves data according to that.
   * It also check all validation, if an undesirable thing happens, it generates an alert.
   */
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

    let qI = this.question_form.value.ques_Image;
    let op1I = this.question_form.value.option1_Image;
    let op2I = this.question_form.value.option2_Image;
    let op3I = this.question_form.value.option3_Image;
    let op4I = this.question_form.value.option4_Image;


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
    tempObj.quesID = this.questions.length + 1;
    tempObj.question = ques;
    tempObj.quesType = ty;
    tempObj.option1 = o1;
    tempObj.option2 = o2;
    tempObj.option3 = o3;
    tempObj.option4 = o4;

    // var binary = reader.readAsBinaryString(quesImg);

    // tempObj.quesImage = binary;
    // tempObj.quesImage = quesImg;
    tempObj.quesImage =this.question_form.value.ques_Image;
    tempObj.option1Image = this.question_form.value.option1_Image;
    tempObj.option2Image = this.question_form.value.option2_Image;
    tempObj.option3Image = this.question_form.value.option3_Image;
    tempObj.option4Image = this.question_form.value.option4_Image;

    tempObj.quesImage = qI;
    tempObj.option1Image = op1I;
    tempObj.option2Image = op2I;
    tempObj.option3Image = op3I;
    tempObj.option4Image = op4I;

    if (tempObj.quesType != 'Textual') {
      // if (o1 == "" || o2 == "" || o3 == "" || o4 == "" || o1 == null || o2 == null || o3 == null || o4 == null) {
      //   this.dialog.open(AlertDialog, { data: { message: 'Options cannot be empty!' } });
      //   return;
      // }
      if (((o1 == "" || o1 == null ) && (op1I == "" || op1I == null)) || ((o2 == "" || o2 == null ) && (op2I == "" || op2I == null)) || ((o3 == "" || o3 == null ) && (op3I == "" || op3I == null)) || ((o4 == "" || o4 == null ) && (op4I == "" || op4I == null)) ) {
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

        if (c1 == null || c1 == "") {​​​​

          tempObj.correct1 = false;

        }​​​​

        if (c2 == null || c2 == "") {​​​​

          tempObj.correct2 = false;

        }​​​​

        if (c3 == null || c3 == "") {​​​​

          tempObj.correct3 = false;

        }​​​​

        if (c4 == null || c4 == "") {​​​​

          tempObj.correct4 = false;

        }​​​​
      }
    }
    else {
      if (ta == "" || ta == null) {
        this.dialog.open(AlertDialog, { data: { message: 'Answer cannot be empty!' } });
        return;
      }
      tempObj.textAnswer = ta;
    }

    this.questions.push(tempObj);
    this.question_form.reset();

  }
  /**
   * This method is used to save the quiz data / quiz question into database.
   * If User tries to create quiz without any question , it will generate alert.
   * 
   * After storing the quiz, control will shift to shareQuiz page, where user can share the quiz URL.
   */
  saveQuestions() {

    if (this.questions.length == 0) {
      this.dialog.open(AlertDialog, { data: { message: 'Questions not added!' } });
      return;
    }

    let resp = this.service.addQuestions(this.questions, this.quizId);
    resp.subscribe((data) => this.message = data);

    this._router.navigate(['/shareQuiz', this.quizId])

  }

}

@Component({
  selector: 'alert-dialog',
  templateUrl: 'alert-dialog.html',
})
/**
 * This is for generating the alert when an undesirable thing happens.
 */
export class AlertDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) { }
}
