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
        labels: ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60'],
        datasets: [{
          label: 'Number of Candidates',
          data: [11, 19, 8, 3, 6, 15],
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
