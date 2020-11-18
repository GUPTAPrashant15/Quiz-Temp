import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as CanvasJS from 'canvasjs.min.js';
import {Location} from '@angular/common';
import {AnlysisResultService} from '../anlysis-result.service';



@Component({
  selector: 'app-anlysis-result',
  templateUrl: './anlysis-result.component.html',
  styleUrls: ['./anlysis-result.component.css']
})
export class AnlysisResultComponent implements OnInit {
  public quizId: any;
  public quiz: any;
  constructor(private _anlysisResultService: AnlysisResultService,private router: Router,private route:ActivatedRoute,private _location: Location) { }

  
  ngOnInit(): void {

    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.quizId = id;

    this._anlysisResultService.getQuizByresultId(this.quizId)
      .subscribe(data => this.quiz = data);

  }
  backClicked() {
    this._location.back();
  }
  saveValue(f){​​​​ 
    console.log(f.Ques)
    
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
              {​​​​ y: response.optionA, label: "Option A" }​​​​,
              {​​​​ y: response.optionB, label: "Option B" }​​​​,
              {​​​​ y: response.optionC, label: "Option C" }​​​​,
              {​​​​ y: response.optionD, label: "Option D" }​​​​
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
              {​​​​ y: response.optionA, name: "Option A" }​​​​,
              {​​​​ y: response.optionB, name: "Option B" }​​​​,
              {​​​​ y: response.optionC, name: "Option C" }​​​​,
              {​​​​ y: response.optionD, name: "Option D" }​​​​
            ]
          }​​​​]
        }​​​​);
         }​
          chart.render();​​​

      }
    );
}​​​​
}

