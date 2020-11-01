import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import {AnlysisResultService} from '../anlysis-result.service';



@Component({
  selector: 'app-anlysis-result',
  templateUrl: './anlysis-result.component.html',
  styleUrls: ['./anlysis-result.component.css']
})
export class AnlysisResultComponent implements OnInit {
  public graphData=[];
  constructor(private _anlysisResultService: AnlysisResultService) { }

  
  ngOnInit(): void {

    this._anlysisResultService.getData()
        .subscribe(data => this.graphData = data); 

          
  }
  saveValue(f){   
    var x= f.Ques;
    console.log(this.graphData)
    var z= this.graphData[x-1]
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Analysing your Result Dynamically"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: z.a, label: "Option A" },
          { y: z.b, label: "Option B" },
          { y: z.c, label: "Option C" },
          { y: z.d, label: "Option D" }
        ]
      }]
    });
      
    chart.render();
      
  }


}
