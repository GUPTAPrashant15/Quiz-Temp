import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateQuizService} from 'src/app/create-quiz.service';
import { ViewEncapsulation } from '@angular/core';
//import { relative } from 'path';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  public username:any ="sweety.agarwal02";
  
  constructor(private route: ActivatedRoute,
    private router: Router,private service: CreateQuizService) { }

  ngOnInit(): void {
  }
  createdQuiz()
  {
    this.router.navigate(['/list'],{relativeTo: this.route});
    this.service.passUsername(this.username);
  }
  createQuiz()
  {
    this.router.navigate(['/addQuiz'],{relativeTo:this.route});
  }
  logOut(){
    this.router.navigate(['/login'])
  }
}
