import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    if(document.getElementById('logout')){
      let logout = document.getElementById('logout');
        logout.style.display = "none";
    }
    if(document.querySelector('.navButton')){
      let dashboard = document.querySelector('.navButton');
      dashboard.textContent = "";
    }
  }


}
