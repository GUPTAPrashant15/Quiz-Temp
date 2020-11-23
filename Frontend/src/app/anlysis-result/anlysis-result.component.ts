import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as CanvasJS from 'canvasjs.min.js';
import {Location} from '@angular/common';
import {AnlysisResultService} from '../anlysis-result.service';

/**
*This component enables the user to analysis the result by response vs count graph.
*/

@Component({
  selector: 'app-anlysis-result',
  templateUrl: './anlysis-result.component.html',
  styleUrls: ['./anlysis-result.component.css']
})
export class AnlysisResultComponent implements OnInit {
  /**
  * variable to store quizId.
  */
  public quizId: any;
  public quiz: any;
  constructor(private _anlysisResultService: AnlysisResultService,private router: Router,private route:ActivatedRoute,private _location: Location) { }

    /**
  * it initalize the quizId and Quiz Data.
  * This take quizId from URL.
  * This take quiz data using service and store into quiz variable.
  */
  ngOnInit(): void {

    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.quizId = id;

    this._anlysisResultService.getQuizByresultId(this.quizId)
      .subscribe(data => this.quiz = data);

  }
  /**
  * This function will called when user clicking on back button.
  * This navigate the user into previous page.
  */
  backClicked() {
    this._location.back();
  }
  
    /**
  * This function provides the user two option for chart. one is pie chart and another is column chart.
  * according to selected chart type, it ask for question number, and on the basis of question number and chart type , it will generate respective chart.
  */
  saveValue(f){​​​​ 
    if(this.quiz.questions[f.Ques-1].quesType == "Textual")
    {
      alert("Can't Display Graphs for Textual Question!! Please select Another Question");
    }
    else{
    this._anlysisResultService.getGraphData(this.quizId,f.Ques).subscribe(
      response => {

        let chart: any;
         if(f.chartType==1){​​​​
        chart = new CanvasJS.Chart("chartContainer", {​​​​
         animationEnabled: true,
          exportEnabled: true,
          title: {​​​​
            text: "Analysing your Result"
          }​​​​,
          data: [{​​​​
            type: "column",
            dataPoints: [
              {​​​​ y: response.optionA, label: this.quiz.questions[f.Ques-1].option1 }​​​​,
              {​​​​ y: response.optionB, label: this.quiz.questions[f.Ques-1].option2 }​​​​,
              {​​​​ y: response.optionC, label: this.quiz.questions[f.Ques-1].option3 }​​​​,
              {​​​​ y: response.optionD, label: this.quiz.questions[f.Ques-1].option4 }​​​​
            ]
          }​​​​]
        }​​​​);
        
      }​​​​
      if(f.chartType==2){​​​​
        chart = new CanvasJS.Chart("chartContainer", {​​​​
          theme: "light2",
          animationEnabled: true,
          exportEnabled: true,
          title:{​​​​
            text: "Analysing your Result"
          }​​​​,
          data: [{​​​​
            type: "pie",
            showInLegend: true,
            toolTipContent: "<b>{​​​​name}​​​​</b> {​​​​y}​​​​ (#percent%)",
            indexLabel: "{​​​​name}​​​​ - #percent%",
            dataPoints: [
              {​​​​ y: response.optionA, name: this.quiz.questions[f.Ques-1].option1 }​​​​,
              {​​​​ y: response.optionB, name: this.quiz.questions[f.Ques-1].option2 }​​​​,
              {​​​​ y: response.optionC, name: this.quiz.questions[f.Ques-1].option3 }​​​​,
              {​​​​ y: response.optionD, name: this.quiz.questions[f.Ques-1].option4 }​​​​
            ]
          }​​​​]
        }​​​​);
         }​
          chart.render();​​​

      }
    );
}​​​​
}
}

