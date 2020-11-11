import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { QuizService } from '../../services/quiz.service';
import { HelperService } from '../../services/helper.service';
import { Question, Quiz, QuizConfig } from '../../models/index';
import { Answer } from '../../models/answer';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { ParticipantService } from 'src/app/services/participant.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  [x: string]: any;
  quizes: any[];
  @Input() userName: string;
  @Input() quiz: Quiz=new Quiz(null);
  
  countAnsweredQues=0;
  flag=0;
  mode = 'quiz';
  config: QuizConfig = {
    'allowBack': false,
    'allowReview': false,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 30,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';
  textAnswer='';

  constructor(private quizService: QuizService ,private router: Router,
    private route: ActivatedRoute , private participantService :ParticipantService, private cookie : CookieService) { }

  ngOnInit() {
    this.participantService.updateParticipant( this.quiz.quizId).subscribe(res => {
     
    }), 
   (error) => console.log('error', error)

    this.pager.index= Number(this.cookie.get(this.userName));
    this.pager.count = this.quiz.questions.length;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(this.config.duration);
    
  }
  @HostListener('window:beforeunload')
  async ngOnDestroy()
  {   this.participantService.removeParticipant( this.quiz.quizId).subscribe(res => {
  

  }
  ,
               (error)=> console.log('error',error))
  
    //localStorage.setItem("my","hritik");
    //await this._RegistrationService.test();
    //alert("hello");
  }
  
  getStyleClass(value: number){
    if(value<0.333)
    return 'progress-easy';
    if(value>=0.333 && value<0.50)
    return 'progress-medium';
    if(value>=0.50 && value<=0.80)
    return 'progress-hard';
    if(value>=0.80){
      return 'progress-very-hard';
    }
  }
 liveUsers=0;
  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    this.getLiveUsers(this.quiz.quizId);

    if (diff >= this.config.duration && this.flag==0) {
      // this.onSubmit();
      this.flag=1;
      
    }
    
    this.ellapsedTime = this.parseTime(diff);
  }
  getLiveUsers(quizId: number){
    this.quizService.liveUserNumber(quizId).subscribe(  
      response => {
              this.liveUsers=response;
              // console.log(this.liveUsers);
           
            },
             (error)=> console.log('error',error)

             
      )

    console.log(this.liveUsers);


  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

   onSelect(question: Question,option1:  string,letter: string) {
    if (question.quesType === "Single Correct") {
      {
        question.answer.answer=letter;
        question.answer.len=1;
        console.log(question.answer);
        const dateNow = new Date();
        dateNow.setHours(dateNow.getHours() + 1);
        this.cookie.set(this.userName, (this.pager.index+1).toString(),dateNow);
      
      }
   }
    
   }
   onSelectMulti(question: Question,option:  string,letter: string) {
    if (question.quesType === "Multiple Correct") {
    let flag=0;
    let str='';
      for(let i=0;i<question.answer.len;i++){
        if(question.answer.answer.charAt(i)!=letter){
          str=str+question.answer.answer.charAt(i);
        }
        else{
          flag=1;
        }
      }
      if(flag==0){
        question.answer.answer=question.answer.answer+letter;
        question.answer.len=question.answer.len+1;
        console.log(question.answer);
      }
      else{
        question.answer.answer=str;
        question.answer.len=str.length;
        console.log(question.answer);
      }
   }
   const dateNow = new Date();
        dateNow.setHours(dateNow.getHours() + 1);
        this.cookie.set(this.userName, (this.pager.index+1).toString(),dateNow);
      
  }
  onWritingText(question: Question){
    question.answer.answer=this.textAnswer;
    console.log(question.answer);
    const dateNow = new Date();
        dateNow.setHours(dateNow.getHours() + 1);
        this.cookie.set(this.userName, (this.pager.index+1).toString(),dateNow);
      
  }
  
  

  goTo(question: Question,index: number) {
    question.answer.quesId=question.quesId;
    question.answer.answerId=question.quesId;
    question.answer.quizId=this.quiz.quizId;
    question.answer.quizName=this.quiz.quizName;
    question.answer.userName=this.userName;
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      console.log(question.answer);
      if(question.answer.answer!=""){
        this.countAnsweredQues = this.countAnsweredQues +1;
      }
      
    }
    else{
      if(question.answer.answer!=""){
        this.countAnsweredQues = this.countAnsweredQues +1;
      }
      this.mode='quizEnded';
      }  
      console.log(this.countAnsweredQues);

      {this.quizService.saveAnswer(question.answer).subscribe(  
        response => {
                // if(response=="SAVED"){
                //   alert("Answer Saved SUCCESSFULLY") 
                // } 
                // else {
                //   alert("TRY AGAIN")
                // }
                console.log('success',response)
              },
               (error)=> console.log('error',error)
        )}
  }
  score:number;
  
  onSubmit() {
    let time=new Date();
    console.log(time);

   // this.participantService.removeParticipant( this.quiz.quizId).subscribe(res => {
      this.quizService.submitQuiz(this.userName , this.quiz.quizId).subscribe(  
        response => {
                // if(response=="Submitted"){
                //   alert("Quiz Submitted SUCCESSFULLY") 
                // } 
                // else {
                //   alert("TRY AGAIN")
                // }
                this.score=response;
                console.log('Score',this.score)
                this.router.navigateByUrl('/result',{ state: { quiz: this.quiz,username: this.userName,score: this.score}});  
              },
               (error)=> console.log('error',error)
  
               
        )
  
      console.log("yha aa gya" ,this.score);
      this.cookie.delete(this.userName);
    

    }
   
}
