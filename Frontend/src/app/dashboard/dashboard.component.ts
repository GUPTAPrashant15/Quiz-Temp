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
  
 //public username;
  constructor(private route: ActivatedRoute,
    private router: Router,private service: CreateQuizService) { }

  ngOnInit(): void {
    let logout = document.getElementById('logout');
    logout.style.display = "";

    let dashboard = document.querySelector('.navButton');
    dashboard.textContent = "Dashboard";
   // let logout = document.getElementById('logout');
   // logout.style.display = "";
  // this.service.share.subscribe(x => this.username = x);
    //let dashboard = document.querySelector('.navButton');
    //dashboard.textContent = "Dashboard";

  }
  createdQuiz()
  {
    this.router.navigate(['/list'],{relativeTo: this.route});
    //this.service.passUsername(this.username);
  }
  createQuiz()
  {
    this.router.navigate(['/addQuiz'],{relativeTo:this.route});
  }
  logOut(){
    this.router.navigate(['/login'])
  }
}
