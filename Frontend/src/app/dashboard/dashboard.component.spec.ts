import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, Inject } from '@angular/core';
import { fakeAsync, async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule, Route, Router, LoadChildren, RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { QuizListComponent } from '../quiz-list/quiz-list.component';
import { RegisterQuizComponent } from '../register-quiz/register-quiz.component';
import { DashboardComponent } from './dashboard.component';
import { Location } from '@angular/common';
import { Observable, of, Subject } from 'rxjs';
import { LoginComponent } from '../login';
describe('DashboardComponent', () => {
  let inject: Inject;

  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let router: Router;
  let debugElement: DebugElement;
  let location: Location;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'list', component: QuizListComponent },
            { path: "addQuiz", component: RegisterQuizComponent },
            { path: "login", component: LoginComponent },
          ]
        ),
      ],
      declarations: [DashboardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
    router.initialNavigation();
  });


  it('should Router.navigateByUrl("/list") when call createQuiz() ', async(() => {
    const spy = spyOn(router, 'navigate');

    component.createdQuiz();

    const url = spy.calls.first().args[0];

    expect(url).toEqual(['/list']);
  }));

  it('should Router.navigateByUrl("/logout") when call logout() ', async(() => {
    const spy = spyOn(router, 'navigate');

    component.logOut();

    const url = spy.calls.first().args[0];

    expect(url).toEqual(['/login']);
  }));

  it('should Router.navigateByUrl("/list") when call createdQuiz() ', async(() => {
    const spy = spyOn(router, 'navigate');

    component.createQuiz();

    const url = spy.calls.first().args[0];

    expect(url).toEqual(['/addQuiz']);
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be createQuiz() function ', () => {
    expect(component.createQuiz).toBeTruthy();

  });


  it('should be createdQuiz() function ', () => {
    expect(component.createdQuiz).toBeTruthy();
  });

  it('should be logout() function ', () => {
    expect(component.logOut).toBeTruthy();
  });



  it('should be 1 mat-card', () => {
    const divcount = fixture.debugElement
      .queryAll(By.css('mat-card'));
    expect(divcount.length).toBe(1);
  });

  it('should be 2 button', () => {
    const divcount = fixture.debugElement
      .queryAll(By.css('button'));
    expect(divcount.length).toBe(2);
  });

  it('should have create-quiz.png in "Create Quiz Button"', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('#c1');
    expect(btn.innerHTML).toBe('<img src="assets/image/create-quiz.png" width="130" height="135">');
  });

  it('should have Created-quiz.png in "Created Quiz Button "', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('#c2');
    expect(btn.innerHTML).toBe('<img src="assets/image/created-1.png" width="130" height="130">');
  });

});
