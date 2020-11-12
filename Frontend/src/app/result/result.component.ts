import { Component, OnInit } from '@angular/core';
import { Quiz } from '../models';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  quiz = new Quiz(null);
  username = "";
  score = 0;

  constructor() { }

  ngOnInit() {
    let logout = document.getElementById('logout');
    logout.style.display = "none";
    let dashboard = document.querySelector('.navButton');
    dashboard.textContent = "";
    this.quiz = history.state.quiz;
    this.username = history.state.username;;
    this.score = history.state.score;
  }
}
