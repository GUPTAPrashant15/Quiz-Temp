import { Component, OnInit, Input, AfterViewInit, ViewChild  } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {RealtimeresultService} from './../realtimeresult.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';


@Component({
  selector: 'appreal',
  templateUrl: './real.component.html',
  styleUrls: ['./real.component.css']
})




 
export class RealComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'username', 'date', 'marks'];
  dataSource: MatTableDataSource<UserData>  ;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   public MyArray:UserData[]= [
    ];
  
  public sampleArray:UserData[]=[];

  constructor(private _realtimeresult :RealtimeresultService,private router: Router,private route:ActivatedRoute){
     //const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
     var arr =[
   {"id":"1","username":"Shubhanshu","date":"12 Oct 2020","marks":6},
   {"id":"2","username":"Sorav","date":"14 Oct 2020","marks":2},
   {"id":"3","username":"Amit","date":"17 Oct 2020","marks":7},
   {"id":"4","username":"Jai","date":"17 Oct 2020","marks":1},
   {"id":"5","username":"Prakhar","date":"20 Oct 2020","marks":4},
   {"id":"6","username":"Anirudh","date":"21 Oct 2020","marks":7}
   ] ;
   //   this._realtimeresult.getResults().subscribe((data)=>{this.MyArray=data;
     // this.dataSource = new MatTableDataSource(this.MyArray);});
     //this._realtimeresult.getResults().subscribe(data=>this.MyArray = data);
    // Assign the data to the data source for the table to render
   // this.dataSource = new MatTableDataSource(arr);
    
    console.log(this.MyArray.length+"hy");
  }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  public quiz;
  public result;
  public quizId:any;
   ngOnInit(){
   //this._realtimeresult.getResults().subscribe((data)=>{this.MyArray=data;
     // this.dataSource = new MatTableDataSource(this.MyArray);
      //console.log(this.MyArray);});
   
    
 console.log(this.MyArray.length+"HyONinit");
   let id = parseInt(this.route.snapshot.paramMap.get('id'));
   this.quizId = id;
    this._realtimeresult.getQuizById(this.quizId).subscribe(data=>this.quiz=data);
    this._realtimeresult.getResultById(this.quizId).subscribe(data=>{this.result=data;
    this.sampleData(this.result);
     this.dataSource = new MatTableDataSource(this.sampleArray);
     this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
    });
    
 
  }
  
  
  
  public tagselected="";
  quiz_name ;
  quiz_status="Open";
  date_published = "10 Oct 2020 8:57pm";
  total_respondants = "7";
   
 
generateRCG(quiz)
{
  this.router.navigate(['/anlysis-result',quiz.quizId]);
}
generatePCG()
{
  this.router.navigate(['/Performance']);
}
createdQuiz()
{
  this.router.navigate(['/list'],{relativeTo: this.route});
}


sampleData(result)
{
   //var res:[number,string,string,number]=[];
   var Myarr:UserData[] = [] ;
   
   //var Myar:UserData[] = new Array(1);
   for(var i=0;i<result.answerData.length;i++)
   this.sampleArray.push({
   id:i+1+'',
   username: result.answerData[i].userName,
   date:result.answerData[i].localDate,
  marks:result.answerData[i].userScore
   });
  
} 
 
}
 
export interface results
{
  username:string,
  date:string,
  marks:number
}

export interface UserData {
  id: string;
  username: string;
  date: string;
  marks: number;
}
export interface example
{
 
  username: string;
  date: string;
  marks: number; 
}

