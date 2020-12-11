import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { QuizService } from '../../services/quiz.service';

import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantService } from 'src/app/services/participant.service';
import { HostListener } from '@angular/core';
import { faClock, faEye, faUser } from '@fortawesome/free-solid-svg-icons';
import { AlertDialog } from 'src/app/add-questions/add-questions.component';
import { MatDialog } from '@angular/material/dialog';
import { Quiz } from 'src/app/models/quiz';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  faEye = faEye;
  faUser=faUser;
  faClock=faClock;
  
  quizes: any[];
  @Input() userName: string;
  @Input() quiz: Quiz = new Quiz(null);
  mode = 'quiz';
 

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  
  timerId: any = null;
  startTime: Date;
  ellapsedTime = '00:00';
  duration = '';
  diff: number=0;
  keyForIndexCookie: string=null;
  keyForTimeCookie: string=null;
  timeForCookie=0;
  remTime: number;
  answered: number=1;
  last=false;
  submitCount=0;
  
  

  textAnswer = '';

  constructor(private quizService: QuizService, private router: Router,public dialog: MatDialog,
    private route: ActivatedRoute, private participantService: ParticipantService,
     private cookie: CookieService) { }

  ngOnInit() {
    /* 
    converting given time into seconds 
    */
    this.quiz.time=this.quiz.time*60;
    /* 
    Remaining time initially equal to given time
     */
    this.remTime=this.quiz.time;

    this.participantService.updateParticipant(this.quiz.quizId).subscribe(res => {
    }), (error) => console.log('error', error)

    /* 
    checking cookie if any present for this user and asigning it to pager.index
    to start from same question where he left
     */
    this.keyForIndexCookie=this.quiz.quizId+this.userName;
    console.log(this.keyForIndexCookie);
    this.pager.index = Number(this.cookie.get(this.keyForIndexCookie));
    /* 
    checking cookie if any present for this user and asigning it to ellapsedTime
    to start from same time interval where he left
     */
    this.keyForTimeCookie=this.quiz.quizId+'@'+ this.userName;
    if(this.cookie.get(this.keyForTimeCookie)){
      this.ellapsedTime = this.cookie.get(this.keyForTimeCookie);
      /* 
        converting ellapsed time in seconds after fetching it from cookie
      */
      this.timeForCookie=60*Number(this.ellapsedTime.substr(0,2))+Number(this.ellapsedTime.substr(3,2));
      /* 
        calculating remaining time with respect to elapsed time
      */
      this.remTime=this.remTime-this.timeForCookie;
    }
    /* 
        pager.count contains total number of question quiz contains
    */
    this.pager.count = this.quiz.l;
    /* 
        startTime contains starting time of quiz ,i.e. the current time
    */
    this.startTime = new Date();
    /* 
        duration contains total time of quiz in MM:SS format
        that is returned by readTime() function
    */
    this.duration = this.readTime(this.quiz.time);
    /* 
        If pager.index==pager.count-1 it refers that we are on last question
    */
    if(this.pager.index==this.pager.count-1){
      this.last=true;
    }
    /* 
      repeat with the interval of 1 second
    */
    this.timerId = setInterval(() => { this.afterEverySecond(); }, 1000);
  }
  /* 
        on closing window or onReloading we are saving the cookie of user like pager.index,
        ellapsedTime
  */
  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    const dateNow = new Date();
    dateNow.setHours(dateNow.getHours() + 1);
    this.cookie.set(this.keyForTimeCookie,this.ellapsedTime, dateNow);
    this.participantService.removeParticipant(this.quiz.quizId).subscribe(res => {


    }, (error) => console.log('error', error))
  }

  /* 
       Trying to return style for progress bar based on its value 
       to be reflected by no. of questions attempted
  */
  getStyleClass(value: number) {
    if (value < 0.333)
      return 'progress-easy';
    if (value >= 0.333 && value < 0.50)
      return 'progress-medium';
    if (value >= 0.50 && value <= 0.80)
      return 'progress-hard';
    if (value >= 0.80) {
      return 'progress-very-hard';
    }
  }
  /* 
        Initially zero live users
  */
  liveUsers = 0;
  /* 
        function to be called after every second
  */
  afterEverySecond() {
    
    /* 
        fetching liveUsers 
    */
    this.getLiveUsers(this.quiz.quizId);
    /* 
        one more second escaped so remaining time decreases by one
    */
    this.remTime=this.remTime-1;
    /* 
        Display a alert box when 30 seconds are remaining
        and quiz is not submitted
    */
    if(this.remTime==30 && this.submitCount==0){
      console.log("hi");
      const timeout=5000;
      const dialogRef=this.dialog.open(AlertDialog, { data: { message: '30 Seconds left.Please submit your quiz ' } });
      dialogRef.afterOpened().subscribe(_ => {
        setTimeout(()=>{
          dialogRef.close();
        },timeout)
      })
    }
    /* 
        If no more time is remaining and quiz is not submited 
    */
    if (!this.remTime && this.submitCount==0) {
      /* 
          To stop further calls, we should call clearInterval(timerId).
      */
      clearInterval(this.timerId);
      /* 
          Increase submit count so quiz might not get submitted again
      */
      this.submitCount=1;
      /* 
          assigning quizId,quesId,userName to the answer model to be saved
      */
      this.quiz.questions[this.pager.index].answer.quesId = this.quiz.questions[this.pager.index].quesId;
    
      this.quiz.questions[this.pager.index].answer.quizId = this.quiz.quizId;
    
      this.quiz.questions[this.pager.index].answer.userName = this.userName;

      console.log(this.quiz.questions[this.pager.index]);
      /* 
          If user has answered auto save and submit
      */
      if(this.quiz.questions[this.pager.index].answer.answer){

        console.log("trying to auto  save answer");
          this.quizService.saveAnswer(this.quiz.questions[this.pager.index].answer).subscribe(
            response => {
                
                console.log("auto submitting your answer");
                this.onSubmit();
              
            },
            (error) => console.log('error', error)
          )
      }
      /* 
          If user has not answered just submit the quiz
      */
      else{
        console.log("auto submitting your quiz");
        this.onSubmit();
      }

    }
    /* 
          ellapsed time is equal to totalTime-remainingTime
    */
    this.ellapsedTime = this.readTime(this.quiz.time-this.remTime);
    
  }
  /* 
          readTime() function read time in seconds and
           return its string in MM:SS format
  */
  readTime(seconds: number) {
    let mins: string | number = Math.floor(seconds / 60);
    let secs: string | number = seconds % 60;
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  /* 
          return live users, by calling liveUserNumber method of quizService 
          for the concern quizId
  */
  getLiveUsers(quizId: number) {
    this.quizService.liveUserNumber(quizId).subscribe(
      response => {
        this.liveUsers = response;
      },
      (error) => console.log('error', error)
    )
  }

  get filteredQuestions() {

    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  /* 
        If question Type is single correct this method is called on select of any
        option
  */
  onSelect(question: Question, option1: string, letter: string) {
  
        question.answer.answer = letter;
        question.answer.len = 1;
        this.answered=2;  

  }
  /* 
        If question Type is multiple correct this method is called on select/deselect of
        any option
  */
  onSelectMulti(question: Question, option: string, letter: string) {
    
      let flag = 0;
      let str = '';
      /* 
          we will parse through whole answer string and check if the letter is present,
          if present set flag=1
      */
      for (let i = 0; i < question.answer.len; i++) {
        if (question.answer.answer.charAt(i) != letter) {
          str = str + question.answer.answer.charAt(i);
        }
        else {
          flag = 1;
        }
      }
      /* 
          If letter not present flag==0 so add it to answer string
      */
      if (flag == 0) {
        question.answer.answer = question.answer.answer + letter;
        question.answer.len = question.answer.len + 1;
      }
      /* 
          If letter is present then remove it from answer string
      */
      else {
        question.answer.answer = str;
        question.answer.len = str.length;
      }
      /* 
          If answer length is zero then it is not answered indicated by 
          this.answered=1
      */
      if(question.answer.len==0){
        this.answered=1;
      }
      /* 
          If answer length is not zero then it is answered indicated by 
          this.answered=2
      */
      else{
        this.answered=2;
      }
 

  }
  /* 
        If question is textual type then this method is called whenany input event occur
  */
  onWritingText(question: Question) {
    question.answer.answer = this.textAnswer;
    /* 
          If textAnswer is null then it is not answered indicated by 
          this.answered=1
      */
    if(this.textAnswer==''){
      this.answered=1;
    }
    /* 
          If textAnswer is not null then it is answered indicated by 
          this.answered=1
    */
    else{
      this.answered=2;
    }
    
   

  }

  /* 
      It transfers user to the next question
  */
  moveToNextQuestion(question: Question, index: number) {
    /* 
        assigning quizId,quesId,userName to the answer model to be saved
    */
    question.answer.quesId = question.quesId;
    
    question.answer.quizId = this.quiz.quizId;
    
    question.answer.userName = this.userName;
    /* 
        setting cookies for user storing the pager.index indicating 
        the number of questions attempted by the user
    */
    const dateNow = new Date();
    dateNow.setHours(dateNow.getHours() + 1);
    this.cookie.set(this.keyForIndexCookie, (this.pager.index + 1).toString(), dateNow);
    /* 
        If index is less than pager.count increase pager.index
    */
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
    }
    let flag=0;
    if(question.answer.answer){
      flag=1;

      console.log("trying to save answer");
        this.quizService.saveAnswer(question.answer).subscribe(
          response => {
            /* 
                index==this.pager.count indicate last question,
                 so submit quiz
            */
            if(index==this.pager.count){
              
              console.log("end");
              this.onSubmit();
            }
          },
          (error) => console.log('error', error)
        )

    }
    /* 
        index==this.pager.count indicate last question, so submit quiz if not before
    */
    if(index==this.pager.count){
      if(flag==0){
        console.log("end");
        this.onSubmit();
      }
      
    }
    else{
      this.textAnswer='';
      if(this.pager.index==this.pager.count-1){
        this.last=true;
        console.log("going on last question");
      }
      else{
        console.log("many questions remaining");
        this.answered=1;
        
      }
    }
   
    
  }
   /* 
        variable to store store
  */
  score: number;
  /* 
        method call when need to submit quiz
  */
  onSubmit() {
    
    this.submitCount=1;

   console.log(this.remTime);

    this.quizService.submitQuiz(this.userName, this.quiz.quizId,this.remTime).subscribe(
      response => {
        console.log("-----------------",response);
        this.score = response;
        console.log(this.score);
        
        this.router.navigateByUrl('/result', { state: { quiz: this.quiz, username: this.userName, score: this.score } });
      }, (error) => console.log('error', error)
    )
    this.cookie.delete(this.keyForIndexCookie);
    this.cookie.delete(this.keyForTimeCookie);
    console.log(this.cookie.delete(this.keyForTimeCookie));
    console.log(this.keyForTimeCookie);
  }
}
