import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from '../models/quiz';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  quiz = new Quiz(null);
  username = "";
  score = 0;

  constructor(private route: Router) { }

  ngOnInit() {

    if(history.state.quiz){
      this.quiz = history.state.quiz;
      this.username = history.state.username;;
      this.score = history.state.score;

    }
    else{
      this.route.navigate(['/page-not-found']);
    }
    
    if(document.getElementById('logout')){
      let logout = document.getElementById('logout');
        logout.style.display = "none";
    }
    if(document.querySelector('.navButton')){
      let dashboard = document.querySelector('.navButton');
      dashboard.textContent = "";
    }


  }
  leaderboard(){
    this.route.navigate(['/leaderboard',this.quiz.quizId]);
  }

}
