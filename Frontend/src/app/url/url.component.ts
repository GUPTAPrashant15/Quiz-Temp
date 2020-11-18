import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.css']
})

export class UrlComponent implements OnInit {

  public href: string = "";

  constructor(private router: Router) { }

  public clickMessage = '';
  url = "localhost:4200/quiz/"
  quizId;
  // onClickMe() {
  //   this.clickMessage = 'SUCCESS!';
  //   this.href = this.url + this.router.url;
  //   document.getElementById('textInput').className = "show";
  // }

  copyInputMessage(inputElement:any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  ngOnInit() {
    this.href = this.url + this.router.url.split('/')[2];
  }

}
