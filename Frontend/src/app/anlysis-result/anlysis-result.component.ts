import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'canvasjs.min.js';
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
  saveValue(f){​​​​ 

     if(f.chartType==1)

     {​​​​

    var z= this.graphData[(f.Ques)-1]

    let chart = new CanvasJS.Chart("chartContainer", {​​​​

      animationEnabled: true,

      exportEnabled: true,

      title: {​​​​

        text: "Analysing your Result"

      }​​​​,

      data: [{​​​​

        type: "column",

        dataPoints: [

          {​​​​ y: z.a, label: "Option A" }​​​​,

          {​​​​ y: z.b, label: "Option B" }​​​​,

          {​​​​ y: z.c, label: "Option C" }​​​​,

          {​​​​ y: z.d, label: "Option D" }​​​​

        ]

      }​​​​]

    }​​​​);

    chart.render();

  }​​​​

  if(f.chartType==2){​​​​

    var z= this.graphData[(f.Ques)-1]

    let chart = new CanvasJS.Chart("chartContainer", {​​​​

      theme: "light2",

      animationEnabled: true,

      exportEnabled: true,

      title:{​​​​

        text: "Analysing your Result"

      }​​​​,

      data: [{​​​​

        type: "pie",

        showInLegend: true,

        toolTipContent: "<b>{​​​​name}​​​​</b>: {​​​​y}​​​​ (#percent%)",

        indexLabel: "{​​​​name}​​​​ - #percent%",

        dataPoints: [

          {​​​​ y: z.a, name: "Option A" }​​​​,

          {​​​​ y: z.b, name: "Option B" }​​​​,

          {​​​​ y: z.c, name: "Option C" }​​​​,
          {​​​​ y: z.d, name: "Option D" }​​​​
        ]
      }​​​​]
    }​​​​);
  chart.render();
      }​​​​

}​​​​

}
