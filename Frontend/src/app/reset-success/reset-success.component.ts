import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-success',
  templateUrl: './reset-success.component.html',
  styleUrls: ['./reset-success.component.css']
})
export class ResetSuccessComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
    // let logout = document.getElementById('logout');
    //     logout.style.display = "none";
    //     let dashboard = document.querySelector('.navButton');
    //     dashboard.textContent = "";
    if(document.getElementById('logout')){
      let logout = document.getElementById('logout');
        logout.style.display = "none";
    }
    if(document.querySelector('.navButton')){
      let dashboard = document.querySelector('.navButton');
      dashboard.textContent = "";
    }
  }
  onCancel(){

    this.route.navigate(['/login'])
    
  }

}
