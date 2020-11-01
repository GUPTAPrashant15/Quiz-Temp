import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-success',
  templateUrl: './reset-success.component.html',
  styleUrls: ['./reset-success.component.css']
})
export class ResetSuccessComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  onCancel(){

    this.route.navigate(['/login'])
    
  }

}
