import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
@Component({
  selector: 'app-performance-chart',
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.css']
})
export class PerformanceChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['0', '1', '2', '3', '4', '5'],
        datasets: [{
          label: 'Number of Candidates',
          data: [1, 0, 1, 1, 1, 1],
          backgroundColor: [
            'rgba(187, 196, 59, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          
          borderWidth: 4
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

  }

}
