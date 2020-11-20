import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateQuizService } from 'src/app/create-quiz.service';
import { ViewEncapsulation } from '@angular/core';


/**This component enables the user to go on the create quiz page and enables the user to go on the created quiz list page of the application. */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  /**@ignore */
  
  constructor(
    /**@ignore */
    private route: ActivatedRoute,
    /**@ignore */
    private router: Router,
    /**@ignore */
     private service: CreateQuizService,
     ) { }

     /**
      * This activates the logout and dashboard button on navbar.
      */
  
  ngOnInit(): void {
    let logout = document.getElementById('logout');
    logout.style.display = "";

    let dashboard = document.querySelector('.navButton');
    dashboard.textContent = "Dashboard";

  }

  
  /**
   * This method route the user into already created quiz page on click on created quiz button.
   * where user can analysis , share , download the previous created quiz.
   */
  createdQuiz() {
    this.router.navigate(['/list'], { relativeTo: this.route });
    
  }

  /**
   * This method route the user into create quiz page on click on create quiz button.
   * where user can create the new quiz.
   */
  createQuiz() {
    this.router.navigate(['/addQuiz'], { relativeTo: this.route });
  }

  /**
   * This method will call when user clicks on logout button on matbar.
   * This method used to logout.
   */
  logOut() {
    
    this.router.navigate(['/login'])
    sessionStorage.setItem('currentUser', 'null');
    // sessionStorage.removeItem('currentUser');
  }
}
