import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { PreviewQuizService } from '../preview-quiz.service';

@Component({
  selector: 'app-preview-quiz',
  templateUrl: './preview-quiz.component.html',
  styleUrls: ['./preview-quiz.component.css']
})
export class PreviewQuizComponent implements OnInit {
  public quizId: any;
  public quiz: any;
  constructor(private _previewQuizService: PreviewQuizService,private router: Router,private route:ActivatedRoute,private _location: Location) { }

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.quizId = id;

    this._previewQuizService.getQuizByresultId(this.quizId)
      .subscribe(data => this.quiz = data);
  }
  backClicked() {
    this._location.back();
  }

}
