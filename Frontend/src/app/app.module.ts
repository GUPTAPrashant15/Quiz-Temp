import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {QuizListComponent} from 'src/app/quiz-list/quiz-list.component';
import { RegisterQuizComponent } from './register-quiz/register-quiz.component';
import { AnlysisResultComponent } from './anlysis-result/anlysis-result.component';
import { AnlysisResultService } from './anlysis-result.service';
import {RealComponent} from 'src/app/real/real.component';
import { PerformanceChartComponent } from 'src/app/performance-chart.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CreateQuizService} from 'src/app/create-quiz.service';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { ReactiveFormsModule } from '@angular/forms';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import {MatButtonModule} from '@angular/material/button'; 
import {MatCardModule} from '@angular/material/card';
import { DisplaySuccessComponent } from './display-success/display-success.component'; 
import {MatTableModule} from '@angular/material/table';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    
    RegisterQuizComponent,
    AddQuestionsComponent,
    DisplaySuccessComponent,
    QuizListComponent,
    AnlysisResultComponent,
    RealComponent,
    PerformanceChartComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    Ng2SearchPipeModule,
    
  ],
  providers: [CreateQuizService, AnlysisResultService],
  bootstrap: [AppComponent]
})
export class AppModule { }
