import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../models';
import { ParticipantService } from '../services/participant.service';
import { QuizService } from '../services/quiz.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-quiz-start-page',
  templateUrl: './quiz-start-page.component.html',
  styleUrls: ['./quiz-start-page.component.css'],
  providers: [QuizService]
})
export class QuizStartPageComponent implements OnInit {

  q: { quizId: number };
  front = true;
  quiz: Quiz = new Quiz(null);
  @Input() username: string;

  constructor(private quizService: QuizService, private cookie: CookieService, private fb: FormBuilder, private participantService: ParticipantService, private route: ActivatedRoute, private router: Router) { }
  form: FormGroup = new FormGroup({});

  ngOnInit() {
    this.q = { quizId: this.route.snapshot.params['id'] };
    this.loadQuiz(this.q.quizId);
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[A-Za-z]\\w{5,29}$')]]
    })
    if(document.getElementById('logout')){
      let logout = document.getElementById('logout');
        logout.style.display = "none";
    }
    if(document.querySelector('.navButton')){
      let dashboard = document.querySelector('.navButton');
      dashboard.textContent = "";
    }
  }
  get f() {
    return this.form.controls;
  }

  loadQuiz(id: number) {
    this.quizService.get(id).subscribe(res => {
      this.quiz = new Quiz(res);
    });
  }
  userForm(userInformation) {

    if (Number(this.cookie.get(this.Username.value)) != 0) {
      this.username = this.Username.value;
      this.front = false;
    }
    else {
      this.participantService.checkParticipantDetails(this.Username.value, this.quiz.quizId).subscribe(
        response => {
          if (response) {
            this.username = this.Username.value;
            this.front = false;
          }
          else {
            alert("User with this name already exist!")
          }
        }
      );
    }

  }
  get Username() {
    return this.form.get('username');
  }
}
