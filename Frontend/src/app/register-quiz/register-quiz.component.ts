import { Component, OnInit } from '@angular/core';
import { CreateQuizService } from '../create-quiz.service';
import { CreateQuiz } from '../createQuiz';
import { ActivatedRoute , Router } from '@angular/router';

@Component({
  selector: 'app-register-quiz',
  templateUrl: './register-quiz.component.html',
  styleUrls: ['./register-quiz.component.css']
})
export class RegisterQuizComponent implements OnInit {

  constructor(private service:CreateQuizService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) { }

  quiz: CreateQuiz =  new CreateQuiz(null,'','','');


  message:any;
//add() only for routing purpose
  public add(){
    this._router.navigate(['/addQuestions']
    
    );}

  public createQuiz(){
    
    this.quiz.username = "sweety.agarwal02";
    let resp = this.service.registerQuiz(this.quiz);
    resp.subscribe((data)=>{this.message=data;
      this._router.navigate(['/addQuestions'],{queryParams:{quizId:this.message}});});
    
    }
  ngOnInit(): void {
  }

}

