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
   public result;
  public quizId:any;
  public sampleArray:UserData[]=[];
  
  constructor(private performanceService:PerformanceChartService,private router: Router,private route:ActivatedRoute,private _location: Location) {​​​​ }​​​​



  ngOnInit() {
  let id = parseInt(this.route.snapshot.paramMap.get('id'));
   this.quizId = id;
    this.performanceService.getQuizById(this.quizId).subscribe(data=>{this.quiz=data;
     this.performanceService.getResultById(this.quizId).subscribe(data=>{this.result=data;
    this.sampleData(this.result,this.quiz);
    let chart : any;

    chart = new CanvasJS.Chart("chartContainer", {​​​​

      animationEnabled: true,

       exportEnabled: true,

       title: {​​​​

         text: "Analysing your Result"

       }​​​​,

       data: [{​​​​

         type: "column",

         dataPoints: this.sampleArray

       }​​​​]

     }​​​​);

     chart.render();

    });
    });
   ​​​​ 
    

    

   

    


  }​​​​
   backClicked() {
    this._location.back();
  }
  sampleData(result,quiz)
  { 
     var max_score = this.quiz.questions.length;
     let arr = new Array<number>(max_score+1);

     for(var i=0; i<=max_score;i++)
     {
       arr[i]=0;
     }     
     for(var i=0;i<result.answerData.length;i++)
     {
          arr[result.answerData[i].userScore]++;
     }


     for(var i=0; i<=max_score;i++)
     {
        this.sampleArray.push({
         y: arr[i],
         label : i+""
        }
        );
     } 
  }

}​​​​
export interface UserData {
  y: number;
  label:string;
}