import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
//import { relative } from 'path';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public username:any ="sweety.agarwal02";

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }
  createdQuiz()
  {
    this.router.navigate(['/list',{foo:this.username}],{relativeTo: this.route});
    
  }
  createQuiz()
  {
    this.router.navigate(['/addQuiz'],{relativeTo:this.route});
  }
  logOut(){
    this.router.navigate(['/login'])
  
  
  }
}
