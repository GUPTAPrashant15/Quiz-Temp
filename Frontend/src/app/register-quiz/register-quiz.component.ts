import { Component, OnInit } from '@angular/core';
import { CreateQuizService } from '../create-quiz.service';
import { CreateQuiz } from '../createQuiz';
import { ActivatedRoute, Router } from '@angular/router';
/**
 * The component enables the user to create the new quiz.
 * It take Quiz name and Quiz description as a input.
 */
@Component({
  selector: 'app-register-quiz',
  templateUrl: './register-quiz.component.html',
  styleUrls: ['./register-quiz.component.css']
})
export class RegisterQuizComponent implements OnInit {

  constructor(private service: CreateQuizService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) { }
  /**
   * It is a variable of type CreateQuiz.
   * @see src/app/CreateQuiz
   */
  quiz: CreateQuiz = new CreateQuiz(null, '', '',true, '',null,null,null,null);

  /**
   * @ignore
   */
  message: any;

  /**
   * @ignore
   */
  public user: any;
 
  /**
   * This method is used to save the quiz name , QuizId, Quiz description, username into database.
   * This method will call when user clicking on AddQuestion button.
   * It navigate the control into AddQuestion Page.
   * It also send the quiz id into url.
   */
  public createQuiz() {

    this.service.share.subscribe(x => this.user = x);
    this.quiz.username = this.user;
    let resp = this.service.registerQuiz(this.quiz);

    resp.subscribe((data) => {
      this.message = data;
      this._router.navigate(['/addQuestions'], { queryParams: { quizId: this.message } });
    });

  }
  ngOnInit(): void {

    let logout = document.getElementById('logout');
    logout.style.display = "Logout";

    let dashboard = document.querySelector('.navButton');
    dashboard.textContent = "Dashboard";
  }

}
