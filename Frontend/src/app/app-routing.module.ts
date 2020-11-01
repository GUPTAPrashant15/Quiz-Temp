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

const routes: Routes = [
  {path:"",redirectTo:"dashboard",pathMatch:"full"},
  // {path:"add",redirectTo:"addQuiz",pathMatch:"full"},
  {path: "addQuiz",component:RegisterQuizComponent},
  {path:'list',component:QuizListComponent},
  {path: "dashboard",component:DashboardComponent},
  {path: "addQuestions",component:AddQuestionsComponent},
  {path: "success",component:DisplaySuccessComponent},
  { path: 'anlysis-result', component: AnlysisResultComponent},
  {path: 'realtimeanalysis',component:RealComponent},
  {path:'Performance', component: PerformanceChartComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
