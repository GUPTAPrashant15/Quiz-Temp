import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { QuizService } from '../../services/quiz.service';

import { Question, Quiz } from '../../models/index';

import { ActivatedRoute, Router } from '@angular/router';
import { ParticipantService } from 'src/app/services/participant.service';
import { HostListener } from '@angular/core';
import { faEye, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  faEye = faEye;
  faUser=faUser;
  
  quizes: any[];
  @Input() userName: string;
  @Input() quiz: Quiz = new Quiz(null);

  
  
  mode = 'quiz';
 

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;

  textAnswer = '';

  constructor(private quizService: QuizService, private router: Router,
    private route: ActivatedRoute, private participantService: ParticipantService, private cookie: CookieService) { }

  ngOnInit() {
    this.participantService.updateParticipant(this.quiz.quizId).subscribe(res => {
    }), (error) => console.log('error', error)

    this.pager.index = Number(this.cookie.get(this.userName));
    this.pager.count = this.quiz.l;
    
    this.timer = setInterval(() => { this.tick(); }, 1000);
    

  }

  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    this.participantService.removeParticipant(this.quiz.quizId).subscribe(res => {


    }, (error) => console.log('error', error))
  }

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

  liveUsers = 0;
  tick() {
    
    this.getLiveUsers(this.quiz.quizId);

    
  }
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

  onSelect(question: Question, option1: string, letter: string) {
  
        question.answer.answer = letter;
        question.answer.len = 1;
        // const dateNow = new Date();
        // dateNow.setHours(dateNow.getHours() + 1);
        // this.cookie.set(this.userName, (this.pager.index + 1).toString(), dateNow);

    

  }
  onSelectMulti(question: Question, option: string, letter: string) {
    
      let flag = 0;
      let str = '';
      for (let i = 0; i < question.answer.len; i++) {
        if (question.answer.answer.charAt(i) != letter) {
          str = str + question.answer.answer.charAt(i);
        }
        else {
          flag = 1;
        }
      }
      if (flag == 0) {
        question.answer.answer = question.answer.answer + letter;
        question.answer.len = question.answer.len + 1;
      }
      else {
        question.answer.answer = str;
        question.answer.len = str.length;
      }
    
    // const dateNow = new Date();
    // dateNow.setHours(dateNow.getHours() + 1);
    // this.cookie.set(this.userName, (this.pager.index + 1).toString(), dateNow);

  }
  onWritingText(question: Question) {
    question.answer.answer = this.textAnswer;
    this.textAnswer='';
    // const dateNow = new Date();
    // dateNow.setHours(dateNow.getHours() + 1);
    // this.cookie.set(this.userName, (this.pager.index + 1).toString(), dateNow);
   

  }



  goTo(question: Question, index: number) {
    question.answer.quesId = question.quesId;
    
    question.answer.quizId = this.quiz.quizId;
    
    question.answer.userName = this.userName;
    if (index >= 0 && index <= this.pager.count) {
      this.pager.index = index;
      

    }
    else {
   
      this.mode = 'quizEnded';
    }
    if(question.answer.answer){
        this.quizService.saveAnswer(question.answer).subscribe(
          response => {
          },
          (error) => console.log('error', error)
        )

    }
    const dateNow = new Date();
    dateNow.setHours(dateNow.getHours() + 1);
    this.cookie.set(this.userName, (this.pager.index + 1).toString(), dateNow);

    
  }
  score: number;

  onSubmit() {

   

    this.quizService.submitQuiz(this.userName, this.quiz.quizId).subscribe(
      response => {
        this.score = response;
        this.router.navigateByUrl('/result', { state: { quiz: this.quiz, username: this.userName, score: this.score } });
      }, (error) => console.log('error', error)
    )
    this.cookie.delete(this.userName);
  }
}
