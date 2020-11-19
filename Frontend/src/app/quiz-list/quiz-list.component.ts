import { Component, OnInit } from '@angular/core';
import { CreateQuizService } from 'src/app/create-quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DownloadService } from '../download.service';


import * as $ from 'jquery';
/**
 * This component enables the user to show the list of all previously created quizzes.
 * It provides the feature of analyzing the quiz, shares the quiz, downloads the quiz data, and also provides the feature of changing the status of the quiz.
 * 
 */
@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  searchValue: string;
  public quizzes;
  Status = 'active';
  constructor(private service: CreateQuizService,
    private router: ActivatedRoute, private route: Router,
    private downloadService: DownloadService) { }

  username: any;

  ngOnInit() {

    this.service.share.subscribe(x => this.username = x);
    this.quizzes = this.service.getQuiz(this.username);
  }

  realTimeAnalysis(quiz) {
    this.route.navigate(['/realtimeanalysis', quiz.quizId]);
  }

  share(quiz) {
    this.route.navigate(['/shareQuiz', quiz.quizId])
  }
  public quizStatus
  statusQuiz(quiz) {
    this.service.changeQuizStatus(quiz).subscribe(
      response => {
        console.log(response)
        if (response) {
          this.quizStatus = "Open";
          this.Status = 'Inactive';
        }
        }
        );
        }
  /**
   * This method will call when user click on active or inactive.
   * This method is used to change the status of the change of URL, or we can say that this is used to make the status of URL active or inactive.
   * 
   * @param quiz is containing the quiz object.
   */
  // statusQuiz(quiz) {
  //   this.service.changeQuizStatus(quiz).subscribe(
  //     response => {
  //       console.log(response)
  //       // if (response) {
  //       //   this.quizStatus = "Open";
  //       //   this.Status = 'Inactive';
  //       // }

  //       // else {
  //       //   this.quizStatus = "Closed"
  //       //   this.Status = 'active';
  //       // }
      
  //     }
  //   );

  // }
  active(quizId , isLiveStatus){
    isLiveStatus = !isLiveStatus;
    if($("#course_status_btn_"+ quizId).text() == "Inactivate"){
      isLiveStatus = true;
    }else{
      isLiveStatus  = false;
    }
    this.service.changeQuizStatus(quizId).subscribe(
        function(response){
        if(response){
          console.log(isLiveStatus)
          $("#course_status_btn_" + quizId).text("Inactivate");
        }else{
          $("#course_status_btn_" + quizId).text("Activate");
        }
    });
  }

  exportToCsv(quiz): void {
    this.downloadService.exportToCsv(quiz.questions, quiz.quizName, ['quesId', 'question', 'quesType', 'option1', 'option2', 'option3', 'option4', 'correct', 'correct1', 'correct2', 'correct3', 'correct4', 'textAnswer']);
  }
}