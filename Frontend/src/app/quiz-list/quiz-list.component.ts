import { Component, OnInit } from '@angular/core';
import {CreateQuizService} from 'src/app/create-quiz.service';
import { ActivatedRoute,Router } from '@angular/router';
import { DownloadService } from '../download.service';


@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  searchValue: string;
  public quizzes ;
  constructor(private service: CreateQuizService,
    private router: ActivatedRoute,private route:Router,
    private downloadService: DownloadService) { }

username:any;

  ngOnInit(){
    
    this.service.share.subscribe(x => this.username = x);
    this.quizzes=this.service.getQuiz(this.username);
    }

     realTimeAnalysis(quiz)
    {
       this.route.navigate(['/realtimeanalysis',quiz.quizId]);
    }

    share(quiz)
    {
      this.route.navigate(['/shareQuiz',quiz.quizId])
    }

    exportToCsv(quiz): void {
      this.downloadService.exportToCsv(quiz.questions, quiz.quizName, ['quesId', 'question', 'quesType', 'option1','option2','option3','option4','correct','correct1','correct2','correct3','correct4','textAnswer']);
    }
}
