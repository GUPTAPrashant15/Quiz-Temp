import { Component, OnInit, Input  } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {RealtimeresultService} from './../realtimeresult.service';
@Component({
  selector: 'appreal',
  templateUrl: './real.component.html',
  styleUrls: ['./real.component.css']
})





export class RealComponent implements OnInit {
  constructor(private _realtimeresult :RealtimeresultService,private router: Router,private route:ActivatedRoute){
     
  }
  public MyArray= [
  ];
  public quiz;
  quiz_name;
  public quizId:any;
   ngOnInit(): void {

   this._realtimeresult.getResults().subscribe(data=>this.MyArray = data);
   let id = parseInt(this.route.snapshot.paramMap.get('id'));
   this.quizId = id;
   this._realtimeresult.getQuizById(this.quizId).subscribe(data=>this.quiz=data);
   this.quiz_name = this.quiz.quizName;
   console.log("quiz=" ,this.quiz);
  }
  
  
  
  public tagselected="";
  quiz_status="Open";
  total_respondants = "7";
   

generateRCG()
{
  this.router.navigate(['/anlysis-result']);
}
generatePCG()
{
  this.router.navigate(['/Performance']);
}



 
}

export interface results
{
  username:string,
  date:string,
  marks:number
}