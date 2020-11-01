import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.less']
})

export class UrlComponent implements OnInit {
  public href: string = "";

  constructor(private router: Router) {}

  public clickMessage = '';

  onClickMe() {
    this.clickMessage = 'SUCCESS!';
    
    this.href = this.router.url;
      console.log(this.router.url); 
      document.getElementById('textInput').className="show";
  }

  ngOnInit() {
      this.href = this.router.url;
      console.log(this.router.url);
  }

  
}
