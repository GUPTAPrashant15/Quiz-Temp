import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterQuizComponent } from './register-quiz/register-quiz.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { DisplaySuccessComponent } from './display-success/display-success.component';
import {QuizListComponent} from 'src/app/quiz-list/quiz-list.component';
import {RealComponent} from 'src/app/real/real.component';
import { AnlysisResultComponent } from './anlysis-result/anlysis-result.component';
import { PerformanceChartComponent } from 'src/app/performance-chart.component';
import { RegistrationComponent } from './registration/registration.component';
// import { LoginComponent } from './_models/_services/login';
// import { HomeComponent } from './_models/_services/home';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home';
// import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { LoginComponent } from './login/login.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
// import { RegistrationComponent } from './registration/registration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetSuccessComponent } from './reset-success/reset-success.component';
import { AuthGuard } from './_helpers/auth.guard';
import { UrlComponent } from './url/url.component';
const routes: Routes = [
  {path:"",redirectTo:"/login",pathMatch:"full"},
  // {path:"add",redirectTo:"addQuiz",pathMatch:"full"},
  {path: "addQuiz",component:RegisterQuizComponent,canActivate: [AuthGuard]},
  {path:'list',component:QuizListComponent,canActivate: [AuthGuard]},
  {path: "dashboard",component:DashboardComponent,canActivate: [AuthGuard]},
  {path: "addQuestions",component:AddQuestionsComponent,canActivate: [AuthGuard]},
  {path: "success",component:DisplaySuccessComponent,canActivate: [AuthGuard]},
  {path: 'anlysis-result', component: AnlysisResultComponent,canActivate: [AuthGuard]},
  {path: 'realtimeanalysis/:id',component:RealComponent,canActivate: [AuthGuard]},
  {path:'Performance', component: PerformanceChartComponent,canActivate: [AuthGuard]},
  {path:"registration",component:RegistrationComponent},
  {path:"login",component:LoginComponent},
  {path:"forgotten-password",component:ForgotPasswordComponent},
  // {path:"**", component:LoginComponent},
  { path: "shareQuiz/:id", component:UrlComponent, canActivate: [AuthGuard] }

   //,{path: "home", component:HomeComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
//export class AppRoutingModule { }

export class AppRoutingModule { }
export const routingComponents=[RegistrationComponent,ForgotPasswordComponent,LoginComponent, HomeComponent]

