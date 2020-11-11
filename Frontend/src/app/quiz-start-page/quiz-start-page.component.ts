import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';
import { Quiz } from '../models';
import { ParticipantService } from '../services/participant.service';
import { QuizService } from '../services/quiz.service';
import { CookieService } from 'ngx-cookie-service';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-quiz-start-page',
  templateUrl: './quiz-start-page.component.html',
  styleUrls: ['./quiz-start-page.component.css'],
  providers: [QuizService]
})
export class QuizStartPageComponent implements OnInit {
  q: {quizId: number};
  front=true;
  quiz: Quiz=new Quiz(null);
  @Input() username: string;
  
  constructor(private quizService:QuizService,private cookie : CookieService,private fb: FormBuilder,private participantService: ParticipantService,private route: ActivatedRoute,private router: Router) { }
  form: FormGroup = new FormGroup({});
  ngOnInit() {
    let logout = document.getElementById('logout');
        logout.style.display = "none";
        let dashboard = document.querySelector('.navButton');
        dashboard.textContent = "";
    
    this.q = {quizId: this.route.snapshot.params['id']};
    //this.fetchQuizDetails(this.q.quizId);
    this.loadQuiz(this.q.quizId);
    this.form = this.fb.group({
      username: ['', [Validators.required,Validators.pattern('^[A-Za-z]\\w{5,29}$')]]
    })


  }
  
//   @HostListener('window:beforeunload', ['$event'])
// beforeunloadHandler(event) {
//   console.log("sssssssssss");
//     this.openDocumentSaveDialog();
    
// }
// public openDocumentSaveDialog(): void {
//   const documentSaveDialogRef = this.documentSaveDialog.open(DocumentSaveDialogComponent, {
//       width: '600px',
//       height: '200px',
//       disableClose: true,
//       autoFocus: false,
//       data: null
//   });

//   documentSaveDialogRef.afterClosed().subscribe(result => {
//       this.closeMenu.emit()
//   });
// }  
 
  // fetchQuizDetails(id: number)  
  // {     
  //    {   
  //       console.log(id);

  
  //       this.quizService.saveQuizDetails(id).subscribe(  
  //         response => {  
  //               console.log(response)
  //               if(response){
  //                 this.loadQuiz(response);
  //                 alert("data fetched SUCCESSFULLY")
  //                 console.log(response);
  //               } 
  //               else {
  //                 alert("data not fetched!")
  //               }
  //               console.log('success',response)},
  //              (error)=> console.log('error',error)



  //       );  
        
          
  //    }    
  // }    
  get f(){
    return this.form.controls;
  }
  // userForm(value: string)  
  // {   console.log(value);
  //   this.username=value;
  //   this.front=false;    
  // }    
  loadQuiz(id: number) {
    this.quizService.get(id).subscribe(res => {
      this.quiz = new Quiz(res);
      console.log(this.quiz);
    });
  }
  onSubmit(){
    
    this.front=false;
  }
  OnUpdateUserName(event: Event){
    this.username=(<HTMLInputElement>event.target).value;
    console.log(this.username);
  }
  userForm(userInformation) {

    console.log(this.Username.value);
    if (Number(this.cookie.get(this.Username.value)) != 0) {
      console.log(this.Username.value)
      this.username = this.Username.value;
      this.front = false;
      console.log('success', true)
    }
    else {
      this.participantService.checkParticipantDetails(this.Username.value ,this.quiz.quizId ).subscribe(
        response => {
          console.log(response)
          if (response) {
            // alert("Participant can start quiz")
            console.log(this.Username.value)
            //this.router.navigateByUrl('/otp-verify',{ state: { email: this.emailDetail.emailId}}); 
            this.username = this.Username.value;
            this.front = false;
          }
          else {
            alert("User with this name already exist!")
          }
          console.log('success', response)
        }
      );
    }    
    //  this.front=false; 
    // this.participantService.updateParticipant( this.quiz.quizId)  
    
    // response => {
      //       console.log(response)
      //       if(response){
              
      //       } 
      //       else {
              
      //       }
      //       console.log('success',response)},
      //      (error)=> console.log('error',error)

  
    //  this.front=false; 
 
 } 

 

get Username(){  
  return this.form.get('username');  
}   
}
