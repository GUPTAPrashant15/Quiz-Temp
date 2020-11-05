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
 
  public quizId:any;
   ngOnInit(){
   this._realtimeresult.getResults().subscribe(data=>this.MyArray = data);
   let id = parseInt(this.route.snapshot.paramMap.get('id'));
   this.quizId = id;
    this._realtimeresult.getQuizById(this.quizId).subscribe(data=>this.quiz=data);
   
  }
  
  
  
  public tagselected="";
  quiz_name ;
  quiz_status="Open";
  date_published = "10 Oct 2020 8:57pm";
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