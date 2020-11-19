import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RealtimeresultService } from './../realtimeresult.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
/**
 * This component enables the user for analysis the quiz, on this basis of score , point vs count graph, Response vs count graph.
 */
@Component({
  selector: 'appreal',
  templateUrl: './real.component.html',
  styleUrls: ['./real.component.css']
})





export class RealComponent implements OnInit, AfterViewInit {
  /**
   * Name of column
   */
  displayedColumns: string[] = ['id', 'username', 'date', 'marks'];
  dataSource: MatTableDataSource<UserData>;
  /**
   * Adding mat paginator in table.
   */
  @ViewChild(MatPaginator) paginator: MatPaginator;
  /**
   * Adding mat sort in table.
   */
  @ViewChild(MatSort) sort: MatSort;
  public MyArray: UserData[] = [
  ];
  /**
   * This is variable of type UserData.
   */
  public sampleArray: UserData[] = [];

  constructor(private _realtimeresult: RealtimeresultService, private router: Router, private route: ActivatedRoute) {
    console.log(this.MyArray.length + "hy");
  }
  /**
   * This is used to add paginator and sorting in mat-table
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  /**
   * This is used to add filter in every column.
   * @param event is click event when user click on column name.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  public quiz;
  public result;
  public quizId: any;
  public quizStatus;

  /**
   * This is used to fetch the quiz data at a time of page calling.
   * It fetch the quiz data by quizId and also fetch the result data on the basis of quizId.
   */
  ngOnInit() {

    console.log(this.MyArray.length + "HyONinit");
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.quizId = id;
    this._realtimeresult.getQuizById(this.quizId).subscribe(data => {
      this.quiz = data;
      console.log(this.quiz.keys() + this.quiz.description + "Hey Logger");
    });
    this._realtimeresult.getResultById(this.quizId).subscribe(data => {
      this.result = data;
      this.sampleData(this.result);
      this.dataSource = new MatTableDataSource(this.sampleArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });


  }



  public tagselected = "";
  quiz_name;
  quiz_status = "Open";
  date_published = "10 Oct 2020 8:57pm";
  total_respondants = "7";

  /**
   * This method will call when user clicking in response vs count graph button.
   * This method routes the control into Response vs Count graph page, where user can see response vs count graph.
   * 
   * @param quiz is object of type Quiz.
   */
  generateRCG(quiz) {
    this.router.navigate(['/anlysis-result', quiz.quizId]);
  }
  /**
   * This method is used to route the control into point vs count graph page, where user can see point vs count graph.
   * This method will call when user clicking in point vs count graph button.
   */
  generatePCG(quiz) {
    this.router.navigate(['/Performance']);
  }
  /**
   * This method is used to route the control into previous page.
   * This method will call, when user clicking on back button.
   */
  createdQuiz() {
    this.router.navigate(['/list'], { relativeTo: this.route });
  }


  /**
   * This method is used to store the result into a list.
   * @param result is object of type results .
   */
  sampleData(result) {
    
    var Myarr: UserData[] = [];
    for (var i = 0; i < result.answerData.length; i++)
      this.sampleArray.push({
        id: i + 1 + '',
        username: result.answerData[i].userName,
        date: result.answerData[i].localDate,
        marks: result.answerData[i].userScore
      });

  }

}
/**
 * it is interface of result.
 */
export interface results {
  username: string,
  date: string,
  marks: number
}
/**
 * it is a interface of UserData.
 */
export interface UserData {
  id: string;
  username: string;
  date: string;
  marks: number;
}
export interface example {

  username: string;
  date: string;
  marks: number;
}

