import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AnlysisResultService } from '../anlysis-result.service';
import {CreateQuizService} from '../create-quiz.service';
@Component({
  selector: 'app-preview-quiz',
  templateUrl: './preview-quiz.component.html',
  styleUrls: ['./preview-quiz.component.css']
})
export class PreviewQuizComponent implements OnInit {
  public quizId: any;
  public quiz: any;
  constructor(private _anlysisResultService: AnlysisResultService,
    private service : CreateQuizService,
    private router: ActivatedRoute, private route: Router,
      private _location: Location) { }

  ngOnInit(): void {
    let id = parseInt(this.router.snapshot.paramMap.get('id'));
    this.quizId = id;

    this._anlysisResultService.getQuizByresultId(this.quizId)
      .subscribe(data => this.quiz = data);
  }
  backClicked() {
    this._location.back();
  }

  UpdateQuiz(QuesNo) {
    this.route.navigate(['/update-edit',{'quizId' : this.quizId, 'quesId' : QuesNo.quesId}]);
  
  }

  deleteQuestion(QuesNo){
    
    var qId = this.quizId.toString();
    var questionNo = QuesNo.quesId.toString();
    var sep = "_";
    var str3 = qId.concat(sep.toString());
    var quiz_ques_id = str3.concat(questionNo);
    console.log(quiz_ques_id);
    this.service.deleteQuestion(quiz_ques_id).subscribe(data=>{},error=>{console.log(error)});
    window.location.reload();
  }
}
