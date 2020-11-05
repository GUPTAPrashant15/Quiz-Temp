import { Component, OnInit } from '@angular/core';
import {CreateQuizService} from 'src/app/create-quiz.service';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  searchValue: string;
  public quizzes ;
  constructor(private service: CreateQuizService,
    private router: ActivatedRoute,private route:Router) { }

username:any;

  ngOnInit(){
    
    this.service.share.subscribe(x => this.username = x);
    this.quizzes=this.service.getQuiz(this.username);
    }

     realTimeAnalysis(quiz)
    {
       this.route.navigate(['/realtimeanalysis',quiz.quizId]);
    }
}
