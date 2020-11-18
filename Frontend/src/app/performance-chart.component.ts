import {PerformanceChartService} from 'src/app/performance-chart.service';
import * as CanvasJS from 'canvasjs.min.js';
import { Component, OnInit, Input, AfterViewInit, ViewChild  } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({​​​​

  selector: 'app-performance-chart',

  templateUrl: './performance-chart.component.html',

  styleUrls: ['./performance-chart.component.css']

}​​​​)

export class PerformanceChartComponent implements OnInit {​​​​

  public x:any;
  public quiz:any;
  public quizId:any;

  constructor(private performanceService:PerformanceChartService,private router: Router,private route:ActivatedRoute,private _location: Location) {​​​​ }​​​​



  ngOnInit() {
  let id = parseInt(this.route.snapshot.paramMap.get('id'));
   this.quizId = id;
    this.performanceService.getQuizById(this.quizId).subscribe(data=>{this.quiz=data;
    console.log(this.quiz.description+"Hey Logger");
    });
   ​​​​

    

    this.x=[{​​​​ y: 10, label: "Option A" }​​​​,

    {​​​​ y: 20, label: "Option B" }​​​​,

    {​​​​ y: 30, label: "Option C" }​​​​,

    {​​​​ y: 40, label: "Option D" }​​​​,

    {​​​​ y: 45, label: "Option e" }​​​​]

    let chart : any;

    chart = new CanvasJS.Chart("chartContainer", {​​​​

      animationEnabled: true,

       exportEnabled: true,

       title: {​​​​

         text: "Analysing your Result"

       }​​​​,

       data: [{​​​​

         type: "column",

         dataPoints: this.x

       }​​​​]

     }​​​​);

     chart.render();



  }​​​​
   backClicked() {
    this._location.back();
  }


}​​​​