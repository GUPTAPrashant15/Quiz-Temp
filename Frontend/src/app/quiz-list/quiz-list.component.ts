import { Component, OnInit } from '@angular/core';
import { CreateQuizService } from 'src/app/create-quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DownloadService } from '../download.service';

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
  /**@ignore */
  searchValue: string;
  /**@ignore */
  public quizzes;
  /**@ignore */
  Status = 'active';
  /**@ignore */
  username: any;
  /**@ignore */
  constructor(
    /**@ignore */
    private service: CreateQuizService,
    /**@ignore */
    private router: ActivatedRoute,
    /**@ignore */
    private route: Router,
    /**@ignore */
    private downloadService: DownloadService,
  ) { }


  /**
   * This fetch the all the created quiz of particular user from database at the time of calling the page.
   */
  ngOnInit() {

    this.service.share.subscribe(x => this.username = x);
    this.quizzes = this.service.getQuiz(this.username);
  }

  /**
   * This method route the user on analysis quiz page after click on anaylsis button.
   * 
   * @param quiz is containing the quiz object.
   */
  realTimeAnalysis(quiz) {
    this.route.navigate(['/realtimeanalysis', quiz.quizId]);
  }

  /**
   * This method will call when user click on share.
   * This method route the user to the share a quiz page after clicking on the share button, where the user can share the URL of quiz.
   * 
   * @param quiz is containing the quiz onject.
   * 
   */
  share(quiz) {
    this.route.navigate(['/shareQuiz', quiz.quizId])
  }
  /**
   * @ignore
   */
  public quizStatus
  /**
   * This method will call when user click on active or inactive.
   * This method is used to change the status of the change of URL, or we can say that this is used to make the status of URL active or inactive.
   * 
   * @param quiz is containing the quiz object.
   */
  statusQuiz(quiz) {
    this.service.changeQuizStatus(quiz).subscribe(
      response => {
        console.log(response)
        if (response) {
          this.quizStatus = "Open";
          this.Status = 'Inactive';
        }

        else {
          this.quizStatus = "Closed"
          this.Status = 'active';
        }

      }
    );

  }
/**
 * This method will call when user clicking on download buttton.
 * This method is used to download the quiz data.
 * 
 * @param quiz is containing the quiz object.
 * 
 */
  exportToCsv(quiz): void {
    this.downloadService.exportToCsv(quiz.questions, quiz.quizName, ['quesId', 'question', 'quesType', 'option1', 'option2', 'option3', 'option4', 'correct', 'correct1', 'correct2', 'correct3', 'correct4', 'textAnswer']);
  }
}
