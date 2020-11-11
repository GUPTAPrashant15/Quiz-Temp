import { Component, OnInit } from '@angular/core';
//import { NgxSpinnerService } from 'ngx-spinner';
import { Quiz } from '../models';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  //providers: [NgxSpinnerService]
})
export class ResultComponent implements OnInit {
  // private quiz = new Quiz(null);  
  // private username="";
  // private score=0;
   quiz = new Quiz(null);  
   username="";
   score=0;
  //constructor(private spinner: NgxSpinnerService ) { }
  constructor() { }
  ngOnInit() {
    let logout = document.getElementById('logout');
        logout.style.display = "none";
        let dashboard = document.querySelector('.navButton');
        dashboard.textContent = "";
    this.quiz = history.state.quiz;
    this.username=history.state.username;;
    this.score=history.state.score;
    console.log("-------"+this.score);
    console.log(this.username);
    console.log(this.quiz);
    console.log(this.username);

  //   this.spinner.show();
  //   setTimeout(()=> {
  //     this.spinner.hide();
  //   },5000);
  }

}
