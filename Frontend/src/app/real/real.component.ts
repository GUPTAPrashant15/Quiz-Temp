import { Component, OnInit, Input  } from '@angular/core';
import {Router} from '@angular/router';
import {RealtimeresultService} from './../realtimeresult.service';

@Component({
  selector: 'appreal',
  templateUrl: './real.component.html',
  styleUrls: ['./real.component.css']
})





export class RealComponent implements OnInit {
  constructor(private _realtimeresult :RealtimeresultService,private router: Router){}
  public MyArray= [
  ];
   ngOnInit(): void {
   this.MyArray = this._realtimeresult.getResults();
  }
  
  
  
 
  public tagselected="";
  quiz_name = "Math Quiz";
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

